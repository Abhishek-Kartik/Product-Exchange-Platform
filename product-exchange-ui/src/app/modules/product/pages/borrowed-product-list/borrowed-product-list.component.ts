import { Component, OnInit } from '@angular/core';
import { BorrowedProductResponse, FeedbackRequest, PageResponseBorrowedProductResponse, ProductResponse } from 'src/app/services/models';
import { FeedbackService, ProductService } from 'src/app/services/services';

@Component({
  selector: 'app-borrowed-product-list',
  templateUrl: './borrowed-product-list.component.html',
  styleUrls: ['./borrowed-product-list.component.css']
})
export class BorrowedProductListComponent implements OnInit {

   page = 0;
  size = 5;
  pages: any = [];
  borrowedProducts: PageResponseBorrowedProductResponse = {};
  selectedProduct: ProductResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {productId: 0, comment: '', note: 0};
  constructor(
    private productService: ProductService,
    private feedbackService: FeedbackService
  ) {
  }
  ngOnInit(): void {
    this.findAllBorrowedProducts();
  }

  private findAllBorrowedProducts() {
    this.productService.findAllBorrowedProducts({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedProducts = resp;
        this.pages = Array(this.borrowedProducts.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedProducts();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedProducts();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedProducts();
  }

  goToLastPage() {
    this.page = this.borrowedProducts.totalPages as number - 1;
    this.findAllBorrowedProducts();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedProducts();
  }

  get isLastPage() {
    return this.page === this.borrowedProducts.totalPages as number - 1;
  }

  returnBorrowedProduct(product: BorrowedProductResponse) {
    this.selectedProduct = product;
    this.feedbackRequest.productId = product.id as number;
  }

  returnProduct(withFeedback: boolean) {
    this.productService.returnBorrowProduct({
      'product-id': this.selectedProduct?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedProduct = undefined;
        this.findAllBorrowedProducts();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }

}
