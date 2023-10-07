import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this.registerForm.valueChanges.subscribe(result => {
    //   this.displayError = undefined;
    // });
  }
}
