package com.abhishek.product_exchange.product;

import com.abhishek.product_exchange.common.PageResponse;
import com.abhishek.product_exchange.exception.OperationNotPermittedException;
import com.abhishek.product_exchange.history.ProductTransactionHistory;
import com.abhishek.product_exchange.history.ProductTransactionHistoryRepository;
import com.abhishek.product_exchange.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    private final ProductTransactionHistoryRepository productTransactionHistoryRepository;

    public Long save(@Valid ProductRequest productRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Product product = productMapper.toProduct(productRequest);
        product.setOwner(user);
        return productRepository.save(product).getId();
    }

    public ProductResponse findById(Long productid) {
        return productRepository.findById(productid)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new EntityNotFoundException("No product found with the ID: "+productid));
    }

    public PageResponse<ProductResponse> findAllProducts(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<Product> products =productRepository.findAllDisplayableProducts(pageable,user.getId());
        List<ProductResponse> productResponses = products.stream()
                .map(productMapper::toProductResponse)
                .toList();
        return new PageResponse<>(
                productResponses,
                products.getNumber(),
                products.getSize(),
                products.getTotalElements(),
                products.getTotalPages(),
                products.isFirst(),
                products.isLast()
        );
    }

    public PageResponse<ProductResponse> findAllProductsByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<Product> products = productRepository.findAll(ProductSpecification.withOwnerId(user.getId()),pageable);
        List<ProductResponse> productResponses = products.stream()
                .map(productMapper::toProductResponse)
                .toList();
        return new PageResponse<>(
                productResponses,
                products.getNumber(),
                products.getSize(),
                products.getTotalElements(),
                products.getTotalPages(),
                products.isFirst(),
                products.isLast()
        );
    }

    public PageResponse<BorrowedProductResponse> findAllBorrowedProducts(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<ProductTransactionHistory> allBorrowedProducts = productTransactionHistoryRepository.findAllBorrowedProducts(pageable, user.getId());
        List<BorrowedProductResponse> productResponses = allBorrowedProducts.stream()
                .map(productMapper::toBorrowedProductResponse)
                .toList();
        return new PageResponse<>(
                productResponses,
                allBorrowedProducts.getNumber(),
                allBorrowedProducts.getSize(),
                allBorrowedProducts.getTotalElements(),
                allBorrowedProducts.getTotalPages(),
                allBorrowedProducts.isFirst(),
                allBorrowedProducts.isLast()
        );
    }

    public PageResponse<BorrowedProductResponse> findAllReturnedProducts(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<ProductTransactionHistory> allBorrowedProducts = productTransactionHistoryRepository.findAllReturnedProducts(pageable, user.getId());
        List<BorrowedProductResponse> productResponses = allBorrowedProducts.stream()
                .map(productMapper::toBorrowedProductResponse)
                .toList();
        return new PageResponse<>(
                productResponses,
                allBorrowedProducts.getNumber(),
                allBorrowedProducts.getSize(),
                allBorrowedProducts.getTotalElements(),
                allBorrowedProducts.getTotalPages(),
                allBorrowedProducts.isFirst(),
                allBorrowedProducts.isLast()
        );
    }

    public Long updateShareableStatus(Long productId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new EntityNotFoundException("No product found with the Id: "+productId));

        if (!Objects.equals(product.getOwner().getProducts(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others products shareable status");
        }
        product.setShareable(!product.isShareable());
        productRepository.save(product);
        return productId;
    }


    public Long updateArchivedStatus(Long productId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new EntityNotFoundException("No product found with the Id: "+productId));

        if (!Objects.equals(product.getCreatedBy(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others products shareable status");
        }
        product.setArchived(!product.isArchived());
        productRepository.save(product);
        return productId;
    }

    public Long borrowProduct(Long productId, Authentication connectedUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new EntityNotFoundException("No product found with the Id: "+ productId));

        if (product.isArchived() || !product.isShareable()) {
            throw new OperationNotPermittedException("The requested product cannot be borrowed since it is archived or not shareable");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(product.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot borrow your own product");
        }
        final boolean isAlreadyBorrowedByUser = productTransactionHistoryRepository.isAlreadyBorrowedByUser(productId, connectedUser.getName());
        if (isAlreadyBorrowedByUser) {
            throw new OperationNotPermittedException("You already borrowed this product and it is still not returned or the return is not approved by the owner");
        }

       ProductTransactionHistory productTransactionHistory = ProductTransactionHistory.builder()
               .user(user)
               .product(product)
               .returned(false)
               .returnApproved(false)
               .build();

        return productTransactionHistoryRepository.save(productTransactionHistory).getId();
    }


    public Long returnBorrowedProduct(Long productId, Authentication connectedUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new EntityNotFoundException("No product found with the Id: "+ productId));

        if (product.isArchived() || !product.isShareable()) {
            throw new OperationNotPermittedException("The requested product cannot be borrowed since it is archived or not shareable");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(product.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot return your own product");
        }
        ProductTransactionHistory productTransactionHistory = productTransactionHistoryRepository.findByProductIdAndUserId(productId,user.getId())
                .orElseThrow(()->new OperationNotPermittedException("You did not borrow this product") );
        productTransactionHistory.setReturned(true);
        return productTransactionHistoryRepository.save(productTransactionHistory).getId();
    }

    public Long approveReturnBorrowedProduct(Long productId, Authentication connectedUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new EntityNotFoundException("No product found with the Id: "+ productId));

        if (product.isArchived() || !product.isShareable()) {
            throw new OperationNotPermittedException("The requested product cannot be borrowed since it is archived or not shareable");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(product.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot return your own product");
        }
        ProductTransactionHistory productTransactionHistory = productTransactionHistoryRepository.findByProductIdAndOwnerId(productId,user.getId())
                .orElseThrow(()->new OperationNotPermittedException("The product is not returned yet. so you cannot approve the return") );

        productTransactionHistory.setReturnApproved(true);
        return productTransactionHistoryRepository.save(productTransactionHistory).getId();
    }
}









