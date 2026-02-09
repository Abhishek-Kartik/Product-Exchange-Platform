/* tslint:disable */
/* eslint-disable */
import { Product } from '../models/product';
export interface Feedback {
  comment?: string;
  createdBy?: number;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  note?: number;
  product?: Product;
}
