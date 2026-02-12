import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedProductListComponent } from './borrowed-product-list.component';

describe('BorrowedProductListComponent', () => {
  let component: BorrowedProductListComponent;
  let fixture: ComponentFixture<BorrowedProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowedProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
