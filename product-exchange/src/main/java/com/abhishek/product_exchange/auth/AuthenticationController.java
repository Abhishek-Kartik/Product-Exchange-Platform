package com.abhishek.product_exchange.auth;


import com.abhishek.product_exchange.user.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        User user = authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(user);
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/activate-account")
    public void confirm(@RequestParam String token) throws MessagingException {
        authenticationService.activateAccount(token);
    }

    @GetMapping("/resend-code")
    public void resendActivationCode(@RequestParam String email) throws MessagingException {
        authenticationService.resendActivationCode(email);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) throws MessagingException {
        authenticationService.forgotPassword(request.getEmail());
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordRequest request) throws MessagingException {
        authenticationService.resetPassword(request);
        return ResponseEntity.accepted().build();
    }


}
