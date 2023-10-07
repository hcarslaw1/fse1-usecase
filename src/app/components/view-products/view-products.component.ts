import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.sass'],
})
export class ViewProductsComponent implements OnInit {
  products = this._productService.getProducts();

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {}

  ngOnInit(): void {}
}
