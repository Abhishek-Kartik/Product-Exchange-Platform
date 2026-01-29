package com.abhishek.product_exchange.product;

import com.abhishek.product_exchange.history.ProductTransactionHistory;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {
    public Product toProduct(@Valid ProductRequest productRequest) {
        return Product.builder()
                .id(productRequest.id())
                .title(productRequest.title())
                .brand(productRequest.brand())
                .description(productRequest.description())
                .archived(false)
                .shareable(productRequest.shareable())
                .build();
    }

    public ProductResponse toProductResponse( Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .brand(product.getBrand())
                .productCode(product.getProductCode())
                .description(product.getDescription())
                .rating(product.getRating())
                .archived(product.isArchived())
                .shareable(product.isShareable())
                .owner(product.getOwner().getFullName())
                .build();
    }



    public BorrowedProductResponse toBorrowedProductResponse(ProductTransactionHistory productTransactionHistory) {
        return BorrowedProductResponse.builder()
                .id(productTransactionHistory.getProduct().getId())
                .title(productTransactionHistory.getProduct().getTitle())
                .brand(productTransactionHistory.getProduct().getBrand())
                .productCode(productTransactionHistory.getProduct().getProductCode())
                .rating(productTransactionHistory.getProduct().getRating())
                .returned(productTransactionHistory.isReturned())
                .returnApproved(productTransactionHistory.isReturnApproved())
                .build();
    }
}
