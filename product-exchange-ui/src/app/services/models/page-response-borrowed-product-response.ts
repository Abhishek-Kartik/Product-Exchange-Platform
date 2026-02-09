/* tslint:disable */
/* eslint-disable */
import { BorrowedProductResponse } from '../models/borrowed-product-response';
export interface PageResponseBorrowedProductResponse {
  content?: Array<BorrowedProductResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
