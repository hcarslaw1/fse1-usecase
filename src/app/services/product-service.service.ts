import { Injectable } from '@angular/core';

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
      status: 'In Stock',
    },
  ];

  addProduct = (
    name: string,
    description: string,
    price: number,
    features: string[],
    status: string
  ) => {
    this.productStore.push({
      name,
      description,
      price,
      features,
      status,
    } as Product);
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
}
