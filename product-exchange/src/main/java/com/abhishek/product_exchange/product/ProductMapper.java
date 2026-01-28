package com.abhishek.product_exchange.product;

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
}
