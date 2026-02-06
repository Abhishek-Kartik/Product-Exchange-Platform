package com.abhishek.product_exchange.product;


import com.abhishek.product_exchange.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("{product-id}")
    public ResponseEntity<ProductResponse> findByProductById(@PathVariable("product-id") Long productid){
        ProductResponse pid = productService.findById(productid);
        return ResponseEntity.status(HttpStatus.OK).body(pid);
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> findAllProducts(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        PageResponse<ProductResponse> response = productService.findAllProducts(page, size, connectedUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<ProductResponse>> findAllProductsByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.findAllProductsByOwner(page, size, connectedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedProductResponse>> findAllBorrowedProducts(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.findAllBorrowedProducts(page, size, connectedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BorrowedProductResponse>> findAllReturnedProducts(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.findAllReturnedProducts(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{product-id}")
    public ResponseEntity<Long> updateShareableStatus(@PathVariable("product-id") Long productId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.updateShareableStatus(productId, connectedUser));
    }


    @PatchMapping("/archived/{product-id}")
    public ResponseEntity<Long> updateArchivedStatus(
            @PathVariable("product-id") Long productId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.updateArchivedStatus(productId, connectedUser));
    }

    @PostMapping("/borrow/{product-id}")
    public ResponseEntity<Long> borrowProduct(
            @PathVariable("product-id") Long productId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.borrowProduct(productId, connectedUser));
    }

    @PatchMapping("/borrow/return/{product-id}")
    public ResponseEntity<Long> returnBorrowProduct(
            @PathVariable("product-id") Long productId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.returnBorrowedProduct(productId, connectedUser));
    }

    @PatchMapping("/borrow/return/approve/{product-id}")
    public ResponseEntity<Long> approveReturnBorrowProduct(
            @PathVariable("product-id") Long productId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(productService.approveReturnBorrowedProduct(productId, connectedUser));
    }
    @PostMapping(value = "/cover/{product-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProductCoverPicture(
            @PathVariable("product-id") Long productId,
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser){
        productService.uploadProductCoverPicture(productId, file, connectedUser);
        return ResponseEntity.accepted().build();
    }

}
