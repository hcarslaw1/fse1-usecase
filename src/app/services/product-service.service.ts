import { Injectable } from '@angular/core';

enum StockStatus {
  OUT_OF_STOCK = 'OUT OF STOCK',
  HURRY_UP = 'HURRY UP TO PURCHASE',
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productStore: Product[] = [
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
  ];

  addProduct = (
    name: string,
    description: string,
    price: number,
    features: string[],
    stockAmount: number
  ) => {
    this.productStore.push({
      name,
      description,
      price,
      features,
      status: this.updateStockStatus(stockAmount)!,
      stockAmount,
    } as Product);
  };

  getProducts = () => {
    return this.productStore;
  };

  updateStockStatus = (stockAmount: number) => {
    if (stockAmount === 0) {
      return StockStatus.OUT_OF_STOCK;
    } else {
      return StockStatus.HURRY_UP;
    }
  };

  updateStockAmount = (productName: string, newStockAmount: number) => {
    const index = this.productStore.findIndex(
      product => product.name === productName
    );
    this.productStore[index].stockAmount = newStockAmount;
    this.productStore[index].status = this.updateStockStatus(newStockAmount);
  };

  isNameUnique = (name: string) => {
    return (
      this.productStore.find(product => product.name === name) === undefined
    );
  };

  constructor() {}
}

interface Product {
  name: string;
  description: string;
  price: number;
  features: string[];
  status: string;
  stockAmount: number;
}
