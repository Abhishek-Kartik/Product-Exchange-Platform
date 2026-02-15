package com.abhishek.product_exchange.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long>{

    Optional<Token> findByToken(String token);

    Optional<Token> findByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("""
            DELETE FROM Token t
            WHERE t.expiredAt < :now
            """)
    Long deleteExpiredTokens(LocalDateTime now);

    @Modifying
    @Transactional
    @Query("""
           DELETE FROM Token t
           WHERE t.user.id = :userId
           """)
    void deleteByUserId(Long userId);
}
