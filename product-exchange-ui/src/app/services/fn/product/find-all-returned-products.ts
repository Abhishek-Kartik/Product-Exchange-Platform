/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBorrowedProductResponse } from '../../models/page-response-borrowed-product-response';

export interface FindAllReturnedProducts$Params {
  page?: number;
  size?: number;
}

export function findAllReturnedProducts(http: HttpClient, rootUrl: string, params?: FindAllReturnedProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedProductResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllReturnedProducts.PATH, 'get');
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

findAllReturnedProducts.PATH = '/products/returned';
