import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-service.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addProduct should create new product and add to store', () => {
    service.addProduct(
      'TestProduct',
      'desc',
      123,
      ['feature1', 'feature2'],
      10
    );
    expect(service.productStore[2]).toEqual({
      name: 'TestProduct',
      description: 'desc',
      price: 123,
      features: ['feature1', 'feature2'],
      status: 'HURRY UP TO PURCHASE',
      stockAmount: 10,
    });
  });

  it('#getProducts should return correct product store', () => {
    expect(service.getProducts()).toEqual([
      {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10,
        features: ['feature 1', 'feature 2'],
        status: 'OUT OF STOCK',
        stockAmount: 10,
      },
      {
        name: 'Product 2',
        description: 'Product 2 description',
        price: 12,
        features: ['feature 1'],
        status: 'OUT OF STOCK',
        stockAmount: 100,
      },
    ]);
  });

  it('#updateStockStatus should return OUT OF STOCK when stock number is 0', () => {
    expect(service.updateStockStatus(0)).toBe('OUT OF STOCK');
  });

  it('#updateStockStatus should return HURRY UP TO PURCHASE when stock number is not 0', () => {
    expect(service.updateStockStatus(10)).toBe('HURRY UP TO PURCHASE');
  });

  it('#updateStockAmount should update stock and status amount of existing product', () => {
    service.updateStockAmount('Product 1', 1000000);
    expect(service.productStore[0].stockAmount).toBe(1000000);
    expect(service.productStore[0].status).toBe('HURRY UP TO PURCHASE');
  });

  it('#isNameUnique should return true for unique product name', () => {
    expect(service.isNameUnique('test product')).toBe(true);
  });

  it('#isNameUnique should return false for existing product name', () => {
    expect(service.isNameUnique('Product 1')).toBe(false);
  });
});
