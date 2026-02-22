package com.abhishek.product_exchange.product;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductRequest(Long id,
                             @NotEmpty(message = "Title is mandatory")
                             @NotNull(message = "Title is mandatory")
                             String title,
                             @NotEmpty(message = "Brand is mandatory")
                             @NotNull(message = "Brand is mandatory")
                             String brand,
                             @NotEmpty(message = "ProductCode is mandatory")
                             @NotNull(message = "ProductCode is mandatory")
                             String productCode,
                             @NotEmpty(message = "Description is mandatory")
                             @NotNull(message = "Description is mandatory")
                             @Size(max = 200, message = "Description cannot exceed 200 characters")
                             String description,
                             boolean shareable) {


}
