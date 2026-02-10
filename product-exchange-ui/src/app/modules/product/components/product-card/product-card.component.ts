import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductResponse } from 'src/app/services/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {

  private _product: ProductResponse = {};
  private _manage = false;
  private _productCover: string | undefined;

  get productCover(): string | undefined {
    if (this._product.imageCover) {
      return 'data:image/jpg;base64,' + this._product.imageCover;
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get product(): ProductResponse {
    return this._product;
  }

  @Input()
  set product(value: ProductResponse) {
    this._product = value;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();
  @Output() private archive: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();
  @Output() private addToWaitingList: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();
  @Output() private borrow: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();
  @Output() private edit: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();
  @Output() private details: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();

  onShare() {
    this.share.emit(this._product);
  }

  onArchive() {
    this.archive.emit(this._product);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._product);
  }

  onBorrow() {
    this.borrow.emit(this._product);
  }

  onEdit() {
    this.edit.emit(this._product);
  }

  onShowDetails() {
    this.details.emit(this._product);
  }
}
