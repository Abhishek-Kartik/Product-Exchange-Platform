/* tslint:disable */
/* eslint-disable */
import { Product } from '../models/product';
import { User } from '../models/user';
export interface ProductTransactionHistory {
  createdBy?: number;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  product?: Product;
  returnApproved?: boolean;
  returned?: boolean;
  user?: User;
}
