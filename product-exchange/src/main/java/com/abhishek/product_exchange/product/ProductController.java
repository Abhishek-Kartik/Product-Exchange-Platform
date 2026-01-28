package com.abhishek.product_exchange.product;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("products")
@RequiredArgsConstructor
@Tag(name = "Product")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Long> saveProduct(@RequestBody @Valid ProductRequest productRequest, Authentication connectedUser){
        Long id = productService.save(productRequest, connectedUser);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }
}
