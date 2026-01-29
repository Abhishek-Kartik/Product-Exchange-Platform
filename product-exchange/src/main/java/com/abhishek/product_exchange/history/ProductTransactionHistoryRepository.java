package com.abhishek.product_exchange.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductTransactionHistoryRepository extends JpaRepository<ProductTransactionHistory, Long> {

    @Query("""
            SELECT history
            FROM ProductTransactionHistory history
            WHERE history.userId = :userId
            """)
    Page<ProductTransactionHistory> findAllBorrowedProducts(Pageable pageable, String userId);
}
