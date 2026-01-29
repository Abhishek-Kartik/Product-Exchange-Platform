package com.abhishek.product_exchange.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @Query("""
            SELECT product
            FROM Product product
            WHERE product.archived = false
            AND product.shareable = true
            AND product.owner.id != :userId
            """)
    Page<Product> findAllDisplayableProducts(Pageable pageable, Long userId);
}
