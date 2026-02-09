/* tslint:disable */
/* eslint-disable */
import { Feedback } from '../models/feedback';
import { ProductTransactionHistory } from '../models/product-transaction-history';
import { User } from '../models/user';
export interface Product {
  archived?: boolean;
  brand?: string;
  createdBy?: number;
  createdDate?: string;
  description?: string;
  feedbacks?: Array<Feedback>;
  histories?: Array<ProductTransactionHistory>;
  id?: number;
  imageUrl?: string;
  lastModifiedBy?: number;
  lastModifiedDate?: string;
  owner?: User;
  productCode?: string;
  rating?: number;
  shareable?: boolean;
  title?: string;
}
