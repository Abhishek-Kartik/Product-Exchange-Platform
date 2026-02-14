package com.abhishek.product_exchange.user;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TokenScheduler {

    private final TokenRepository tokenRepository;

    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Kolkata")
    @Transactional
    public void cleanExpiredTokens() {
        Long deleted = tokenRepository.deleteExpiredTokens(LocalDateTime.now());
        System.out.println("Deleted tokens: " + deleted);
    }
}
