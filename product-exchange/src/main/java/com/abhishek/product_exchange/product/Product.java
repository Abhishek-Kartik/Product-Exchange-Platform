package com.abhishek.product_exchange.product;


import com.abhishek.product_exchange.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends BaseEntity {
    private String title;
    private String brand;
    private String productCode;

    @Column(length = 2000)
    private String description;
    private String imageUrl;
    private boolean archived;
    private boolean shareable;
}
