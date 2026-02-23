import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PageResponseProductResponse,
  ProductResponse,
} from 'src/app/services/models';
import { ProductService } from 'src/app/services/services';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  productResponse: PageResponseProductResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findAllProducts();
  }

  private findAllProducts() {
    this.productService
      .findAllProductsByOwner({
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


  shareProduct(product: ProductResponse) {
    this.productService
      .updateShareableStatus({
        'product-id': product.id as number,
      })
      .subscribe({
        next: () => {
          product.shareable = !product.shareable;
        },
      });
  }

  editProduct(product: ProductResponse) {
    this.router.navigate(['products', 'manage', product.id]);
  }

  deleteProduct(product: ProductResponse) {
    this.router.navigate(['products', 'delete', product.id]);
  }


  //Archive Confirmation Modal PopUp Handlling
  showArchiveModal = false;
  selectedProduct?: ProductResponse;

  archiveProduct(product: ProductResponse) {
    this.selectedProduct = product;
    this.showArchiveModal = true;
  }

  confirmArchive() {
    if (!this.selectedProduct) return;

    this.productService
      .updateArchivedStatus({
        'product-id': this.selectedProduct.id as number,
      })
      .subscribe({
        next: () => {
          this.selectedProduct!.archived = !this.selectedProduct!.archived;
          this.closeModal();
        },
      });
  }

  closeModal() {
    this.showArchiveModal = false;
    this.selectedProduct = undefined;
  }
}
