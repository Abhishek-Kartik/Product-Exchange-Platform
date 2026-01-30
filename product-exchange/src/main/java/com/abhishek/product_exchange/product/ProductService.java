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
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<ProductTransactionHistory> allBorrowedProducts = productTransactionHistoryRepository.findAllBorrowedProducts(pageable, connectedUser.getName());
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
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<ProductTransactionHistory> allBorrowedProducts = productTransactionHistoryRepository.findAllReturnedProducts(pageable, connectedUser.getName());
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
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new EntityNotFoundException("No product found with the Id: "+productId));

        if (!Objects.equals(product.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You cannot update others products shareable status");
        }
        product.setShareable(!product.isShareable());
        productRepository.save(product);
        return productId;
    }
}









