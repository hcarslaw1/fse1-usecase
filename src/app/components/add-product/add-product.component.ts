import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})
export class AddProductComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  price = new FormControl(0, [Validators.required]);
  features = new FormControl([''], [Validators.required]);
  status = new FormControl('', [Validators.required]);
  stockAmount = new FormControl(0, [Validators.required]);

  productForm = this._fb.group({
    name: this.name,
    description: this.description,
    price: this.price,
    features: this.features,
    stockAmount: this.stockAmount,
  });

  displayError: undefined | string = undefined;

  submit() {
    if (!this.productForm.valid) {
      this.displayError = 'Invalid product details';
      return;
    } else if (
      !this._productService.isNameUnique(this.productForm.value.name!)
    ) {
      this.displayError = 'Product name must be unique';
      return;
    }

    this._productService.addProduct(
      this.productForm.value.name!,
      this.productForm.value.description!,
      this.productForm.value.price!,
      this.productForm.value.features!,
      this.productForm.value.stockAmount!
    );

    this._router.navigateByUrl('login');
  }

  signOut() {
    this._loginService.signOut();
    this._router.navigateByUrl('login');
  }

  updateProduct() {
    this._router.navigateByUrl('update-products');
  }

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.productForm.valueChanges.subscribe(result => {
      this.displayError = undefined;
    });
  }
}
