/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBorrowedProductResponse } from '../../models/page-response-borrowed-product-response';

export interface FindAllBorrowedProducts$Params {
  page?: number;
  size?: number;
}

export function findAllBorrowedProducts(http: HttpClient, rootUrl: string, params?: FindAllBorrowedProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedProductResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllBorrowedProducts.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBorrowedProductResponse>;
    })
  );
}

findAllBorrowedProducts.PATH = '/products/borrowed';
