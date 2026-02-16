package com.abhishek.product_exchange.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ForgotPasswordRequest {
    @Email
    @NotNull
    private String email;
}
