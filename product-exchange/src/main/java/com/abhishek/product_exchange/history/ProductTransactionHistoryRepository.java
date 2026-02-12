package com.abhishek.product_exchange.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductTransactionHistoryRepository extends JpaRepository<ProductTransactionHistory, Long> {

    @Query("""
            SELECT history
            FROM ProductTransactionHistory history
            WHERE history.user.id = :userId
            """)
    Page<ProductTransactionHistory> findAllBorrowedProducts(Pageable pageable, Long userId);

    @Query("""
            SELECT history
            FROM ProductTransactionHistory history
            WHERE history.product.owner.id = :userId
            """)
    Page<ProductTransactionHistory> findAllReturnedProducts(Pageable pageable, Long userId);


    @Query("""
            SELECT
            (COUNT (*) > 0) AS isBorrowed
            FROM ProductTransactionHistory productTransactionHistory
            WHERE productTransactionHistory.user.id = :userId
            AND productTransactionHistory.product.id = :productId
            AND productTransactionHistory.returnApproved = false
            """)
    boolean isAlreadyBorrowedByUser(Long productId, Long userId);

    @Query("""
            SELECT transaction
            FROM ProductTransactionHistory  transaction
            WHERE transaction.user.id = :userId
            AND transaction.product.id = :productId
            AND transaction.returned = false
            AND transaction.returnApproved = false
            """)
    Optional<ProductTransactionHistory> findByProductIdAndUserId(Long productId, Long userId);

    @Query("""
            SELECT transaction
            FROM ProductTransactionHistory  transaction
            WHERE transaction.product.owner.id = :userId
            AND transaction.product.id = :productId
            AND transaction.returned = true
            AND transaction.returnApproved = false
            """)
    Optional<ProductTransactionHistory> findByProductIdAndOwnerId(Long productId, Long userId);
}
