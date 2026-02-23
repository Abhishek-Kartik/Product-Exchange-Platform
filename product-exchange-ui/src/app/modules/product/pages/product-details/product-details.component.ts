import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequest } from 'src/app/services/models';
import { ProductService } from 'src/app/services/services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  errorMsg: Array<string> = [];
  productRequest: ProductRequest = {
    brand: '',
    productCode: '',
    description: '',
    title: '',
  };
  selectedPicture: string | undefined;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['productId'];
    if (productId) {
      this.productService
        .findByProductById({ 'product-id': productId })
        .subscribe({
          next: (product) => {
            this.productRequest = {
              id: product.id,
              title: product.title as string,
              brand: product.brand as string,
              productCode: product.productCode as string,
              description: product.description as string,
              shareable: product.shareable,
            };
            if (product.imageCover)
              this.selectedPicture =
                'data:image/jpg;base64,' + product.imageCover;
          },
          error: () => {
            this.errorMsg = ['Failed to load product'];
          },
        });
    }
  }
}
