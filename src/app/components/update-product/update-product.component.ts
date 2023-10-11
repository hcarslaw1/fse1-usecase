import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.sass'],
})
export class UpdateProductComponent implements OnInit {
  stockAmount = new FormControl(0, [Validators.required]);

  productForm = this._fb.group({
    stockAmount: this.stockAmount,
  });

  products = this._productService.getProducts();
  showForm = false;

  addProduct() {
    this._router.navigateByUrl('add-product');
  }

  submit = (productName: string) => {
    this._productService.updateStockAmount(
      productName,
      this.productForm.value.stockAmount!
    );
    this._router.navigateByUrl('update-products');
  };

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const user = this._loginService.loggedInUser;
    if (user === undefined || user.isAdmin !== true) {
      this._router.navigateByUrl('login');
    }
  }
}
