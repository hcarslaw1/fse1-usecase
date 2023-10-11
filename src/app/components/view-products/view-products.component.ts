import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.sass'],
})
export class ViewProductsComponent implements OnInit {
  products = this._productService.getProducts();
  filteredProducts = this.products;

  filterResults(searchValue: string) {
    if (!searchValue) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this._loginService.loggedInUser === undefined) {
      this._router.navigateByUrl('login');
    }
  }
}
