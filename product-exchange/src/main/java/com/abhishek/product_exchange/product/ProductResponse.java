package com.abhishek.product_exchange.product;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String title;
    private String brand;
    private String productCode;
    private String description;
    private String owner;

    private byte[] imageCover;
    private double rating;

    private boolean archived;
    private boolean shareable;
}
