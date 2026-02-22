import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequest } from 'src/app/services/models';
import { ProductService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;

  errorMsg: Array<string> = [];
  productRequest: ProductRequest = {
    brand: '',
    productCode: '',
    description: '',
    title: '',
  };
  selectedProductCover: any;
  selectedPicture: string | undefined;
  imageDisplay = 'Upload Image';

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['productId'];
    if (productId) {
      this.productService
        .findByProductById({
          'product-id': productId,
        })
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

  saveProduct() {
    this.errorMsg = [];
    this.productService
      .saveProduct({
        body: this.productRequest,
      })
      .subscribe({
        next: (productId) => {
          if (this.selectedProductCover) {
            this.productService
              .uploadProductCoverPicture({
                'product-id': productId,
                body: {
                  file: this.selectedProductCover,
                },
              })
              .subscribe({
                next: () => {
                  this.router.navigate(['/products/my-products']);
                },
              });
          } else {
            this.router.navigate(['/products/my-products']);
          }
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors || [
            'Something went wrong',
          ];
        },
      });
  }

  onFileSelected(event: any) {
    this.selectedProductCover = event.target.files[0];
    console.log(this.selectedProductCover);

    if (this.selectedProductCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedProductCover);
    }
  }

  removeImage() {
    this.selectedPicture = undefined;
    this.selectedProductCover = undefined;
    this.fileInput.nativeElement.value = '';
  }
}
