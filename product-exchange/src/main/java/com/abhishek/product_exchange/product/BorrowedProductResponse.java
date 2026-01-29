package com.abhishek.product_exchange.product;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedProductResponse {
    private Long id;
    private String title;
    private String brand;
    private String productCode;
    private double rating;
    private boolean returned;
    private boolean returnApproved;
}
