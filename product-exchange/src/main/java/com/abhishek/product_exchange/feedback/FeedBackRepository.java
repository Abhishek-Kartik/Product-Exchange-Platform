package com.abhishek.product_exchange.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedBackRepository extends JpaRepository<Feedback, Long> {

    @Query("""
            SELECT feedback
            FROM Feedback  feedback
            WHERE feedback.product.id = :productId
""")
    Page<Feedback> findAllByProductId(Long productId, Pageable pageable);
}
