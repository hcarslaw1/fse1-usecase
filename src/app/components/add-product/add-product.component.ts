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

  registerForm = this._fb.group({
    name: this.name,
    description: this.description,
    price: this.price,
    features: this.features,
    status: this.status,
  });

  displayError: undefined | string = undefined;

  submit() {
    if (!this.registerForm.valid) {
      this.displayError = 'Invalid product details';
      return;
    } else if (
      !this._productService.isNameUnique(this.registerForm.value.name!)
    ) {
      this.displayError = 'Product name must be unique';
      return;
    }

    this._productService.addProduct(
      this.registerForm.value.name!,
      this.registerForm.value.description!,
      this.registerForm.value.price!,
      this.registerForm.value.features!,
      this.registerForm.value.status!
    );

    this._router.navigateByUrl('login');
  }

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(result => {
      this.displayError = undefined;
    });
  }
}
