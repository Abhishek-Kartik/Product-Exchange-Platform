import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PageResponseProductResponse,
  ProductResponse,
} from 'src/app/services/models';
import { ProductService } from 'src/app/services/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productResponse: PageResponseProductResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' | 'error' = 'success';

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findAllProducts();
  }

  private findAllProducts() {
    this.productService
      .findAllProducts({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (products) => {
          this.productResponse = products;
          this.pages = Array(this.productResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllProducts();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllProducts();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllProducts();
  }

  goToLastPage() {
    this.page = (this.productResponse.totalPages as number) - 1;
    this.findAllProducts();
  }

  goToNextPage() {
    this.page++;
    this.findAllProducts();
  }

  get isLastPage() {
    return this.page === (this.productResponse.totalPages as number) - 1;
  }

  borrowProduct(product: ProductResponse) {
    this.message = '';
    this.level = 'success';
    this.productService
      .borrowProduct({
        'product-id': product.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Product successfully added to your list';
        },
        error: (err) => {
          console.log(err);
          this.level = 'error';
          this.message = err.error.error;
        },
      });
  }

  displayProductDetails(product: ProductResponse) {
    this.router.navigate(['products', 'details', product.id]);
  }
  
  addProductToWaitingList(product: ProductResponse) {
    return null;
  }
}
