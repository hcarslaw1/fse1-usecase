import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductComponent } from './update-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service.service';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let productService: ProductService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addProduct should redirect to add-product screen', () => {
    component.addProduct();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('add-product');
  });

  it('#submit should update stock amount', () => {
    productService.productStore[2] = {
      name: 'MOCK_PRODUCT',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      status: 'OUT OF STOCK',
      stockAmount: 100,
    };
    component.productForm.setValue({
      stockAmount: 999,
    });

    component.submit('MOCK_PRODUCT');
    expect(productService.productStore[2].stockAmount).toBe(999);
  });
});
