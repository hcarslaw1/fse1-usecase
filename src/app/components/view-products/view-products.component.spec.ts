import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsComponent } from './view-products.component';
import { ProductService } from 'src/app/services/product-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';

describe('ViewProductsComponent', () => {
  let component: ViewProductsComponent;
  let fixture: ComponentFixture<ViewProductsComponent>;
  let loginService: LoginService;
  let productService: ProductService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductsComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(ViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
    productService = TestBed.inject(ProductService);

    productService.productStore[2] = {
      name: 'MOCK_PRODUCT',
      description: 'MOCK_DESCRIPTION',
      price: 12,
      features: ['feature 1'],
      status: 'OUT OF STOCK',
      stockAmount: 100,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#fitlerResults should set filteredProducts to products if no value searched', () => {
    component.filterResults('');
    expect(component.filteredProducts).toBe(productService.productStore);
  });

  it('#fitlerResults should filter products by search value', () => {
    component.filterResults('MOCK');
    expect(component.filteredProducts).toEqual([
      {
        name: 'MOCK_PRODUCT',
        description: 'MOCK_DESCRIPTION',
        price: 12,
        features: ['feature 1'],
        status: 'OUT OF STOCK',
        stockAmount: 100,
      },
    ]);
  });

  it('ngOnInit should redirect to login if user not logged in', () => {
    loginService.loggedInUser = undefined;
    component.ngOnInit();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('login');
  });
});
