package com.abhishek.product_exchange.product;

import com.abhishek.product_exchange.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    public Long save(@Valid ProductRequest productRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Product product = productMapper.toProduct(productRequest);
        product.setOwner(user);
        return productRepository.save(product).getId();
    }
}
