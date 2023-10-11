import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product-service.service';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productService: ProductService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#submit should add product and redirect to update-products screen', () => {
    component.productForm.setValue({
      name: 'MOCK_PRODUCT',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      stockAmount: 100,
    });
    component.submit();
    expect(productService.productStore[2]).toEqual({
      name: 'MOCK_PRODUCT',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      status: 'HURRY UP TO PURCHASE',
      stockAmount: 100,
    });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('update-products');
  });

  it('#submit should set displayError correctly when form not valid', () => {
    component.productForm.setValue({
      name: '',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      stockAmount: 100,
    });
    component.submit();
    expect(component.displayError).toBe('Invalid product details');
  });

  it('#submit should set displayError correctly when form not valid', () => {
    productService.productStore[2] = {
      name: 'MOCK_PRODUCT',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      status: 'OUT OF STOCK',
      stockAmount: 100,
    };

    component.productForm.setValue({
      name: 'MOCK_PRODUCT',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      stockAmount: 100,
    });
    component.submit();
    expect(component.displayError).toBe('Product name must be unique');
  });

  it('#updateProduct should redirect to update-products screen', () => {
    component.updateProduct();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('update-products');
  });
});
