/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnBorrowProduct } from '../fn/product/approve-return-borrow-product';
import { ApproveReturnBorrowProduct$Params } from '../fn/product/approve-return-borrow-product';
import { borrowProduct } from '../fn/product/borrow-product';
import { BorrowProduct$Params } from '../fn/product/borrow-product';
import { findAllBorrowedProducts } from '../fn/product/find-all-borrowed-products';
import { FindAllBorrowedProducts$Params } from '../fn/product/find-all-borrowed-products';
import { findAllProducts } from '../fn/product/find-all-products';
import { FindAllProducts$Params } from '../fn/product/find-all-products';
import { findAllProductsByOwner } from '../fn/product/find-all-products-by-owner';
import { FindAllProductsByOwner$Params } from '../fn/product/find-all-products-by-owner';
import { findAllReturnedProducts } from '../fn/product/find-all-returned-products';
import { FindAllReturnedProducts$Params } from '../fn/product/find-all-returned-products';
import { findByProductById } from '../fn/product/find-by-product-by-id';
import { FindByProductById$Params } from '../fn/product/find-by-product-by-id';
import { PageResponseBorrowedProductResponse } from '../models/page-response-borrowed-product-response';
import { PageResponseProductResponse } from '../models/page-response-product-response';
import { ProductResponse } from '../models/product-response';
import { returnBorrowProduct } from '../fn/product/return-borrow-product';
import { ReturnBorrowProduct$Params } from '../fn/product/return-borrow-product';
import { saveProduct } from '../fn/product/save-product';
import { SaveProduct$Params } from '../fn/product/save-product';
import { updateArchivedStatus } from '../fn/product/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/product/update-archived-status';
import { updateShareableStatus } from '../fn/product/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/product/update-shareable-status';
import { uploadProductCoverPicture } from '../fn/product/upload-product-cover-picture';
import { UploadProductCoverPicture$Params } from '../fn/product/upload-product-cover-picture';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllProducts()` */
  static readonly FindAllProductsPath = '/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProducts$Response(params?: FindAllProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return findAllProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProducts(params?: FindAllProducts$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.findAllProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `saveProduct()` */
  static readonly SaveProductPath = '/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProduct$Response(params: SaveProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProduct(params: SaveProduct$Params, context?: HttpContext): Observable<number> {
    return this.saveProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadProductCoverPicture()` */
  static readonly UploadProductCoverPicturePath = '/products/cover/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProductCoverPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProductCoverPicture$Response(params: UploadProductCoverPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProductCoverPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProductCoverPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProductCoverPicture(params: UploadProductCoverPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProductCoverPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `borrowProduct()` */
  static readonly BorrowProductPath = '/products/borrow/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowProduct$Response(params: BorrowProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return borrowProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `borrowProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowProduct(params: BorrowProduct$Params, context?: HttpContext): Observable<number> {
    return this.borrowProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/products/shareable/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnBorrowProduct()` */
  static readonly ReturnBorrowProductPath = '/products/borrow/return/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowProduct$Response(params: ReturnBorrowProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnBorrowProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnBorrowProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowProduct(params: ReturnBorrowProduct$Params, context?: HttpContext): Observable<number> {
    return this.returnBorrowProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnBorrowProduct()` */
  static readonly ApproveReturnBorrowProductPath = '/products/borrow/return/approve/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnBorrowProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowProduct$Response(params: ApproveReturnBorrowProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnBorrowProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnBorrowProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowProduct(params: ApproveReturnBorrowProduct$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnBorrowProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/products/archived/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findByProductById()` */
  static readonly FindByProductByIdPath = '/products/{product-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByProductById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByProductById$Response(params: FindByProductById$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return findByProductById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByProductById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByProductById(params: FindByProductById$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.findByProductById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `findAllReturnedProducts()` */
  static readonly FindAllReturnedProductsPath = '/products/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReturnedProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedProducts$Response(params?: FindAllReturnedProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedProductResponse>> {
    return findAllReturnedProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllReturnedProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedProducts(params?: FindAllReturnedProducts$Params, context?: HttpContext): Observable<PageResponseBorrowedProductResponse> {
    return this.findAllReturnedProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedProductResponse>): PageResponseBorrowedProductResponse => r.body)
    );
  }

  /** Path part for operation `findAllProductsByOwner()` */
  static readonly FindAllProductsByOwnerPath = '/products/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProductsByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProductsByOwner$Response(params?: FindAllProductsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return findAllProductsByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllProductsByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProductsByOwner(params?: FindAllProductsByOwner$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.findAllProductsByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `findAllBorrowedProducts()` */
  static readonly FindAllBorrowedProductsPath = '/products/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBorrowedProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedProducts$Response(params?: FindAllBorrowedProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedProductResponse>> {
    return findAllBorrowedProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBorrowedProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedProducts(params?: FindAllBorrowedProducts$Params, context?: HttpContext): Observable<PageResponseBorrowedProductResponse> {
    return this.findAllBorrowedProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedProductResponse>): PageResponseBorrowedProductResponse => r.body)
    );
  }

}
