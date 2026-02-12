import { Component, OnInit } from '@angular/core';
import { BorrowedProductResponse } from 'src/app/services/models/borrowed-product-response';
import { PageResponseBorrowedProductResponse } from 'src/app/services/models/page-response-borrowed-product-response';
import { ProductService } from 'src/app/services/services/product.service';

@Component({
  selector: 'app-returned-products',
  templateUrl: './returned-products.component.html',
  styleUrls: ['./returned-products.component.css']
})
export class ReturnedProductsComponent implements OnInit {

  
  page = 0;
  size = 5;
  pages: any = [];
  returnedProducts: PageResponseBorrowedProductResponse = {};
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.findAllReturnedProducts();
  }

  private findAllReturnedProducts() {
    this.productService.findAllReturnedProducts({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedProducts = resp;
        this.pages = Array(this.returnedProducts.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllReturnedProducts();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedProducts();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllReturnedProducts();
  }

  goToLastPage() {
    this.page = this.returnedProducts.totalPages as number - 1;
    this.findAllReturnedProducts();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedProducts();
  }

  get isLastPage() {
    return this.page === this.returnedProducts.totalPages as number - 1;
  }

  approveProductReturn(product: BorrowedProductResponse) {
    if (!product.returned) {
      return;
    }
    this.productService.approveReturnBorrowProduct({
      'product-id': product.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Product return approved';
        this.findAllReturnedProducts();
      }
    });
  }

}
