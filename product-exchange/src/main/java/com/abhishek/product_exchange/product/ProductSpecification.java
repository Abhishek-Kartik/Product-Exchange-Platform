package com.abhishek.product_exchange.product;

import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    public static Specification<Product> withOwnerId(Long ownerId){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"),ownerId);
    }
}
