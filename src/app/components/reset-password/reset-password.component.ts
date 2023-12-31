import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  resetForm = this._fb.group({
    username: this.username,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  displayError: undefined | string = undefined;

  submit() {
    if (!this.resetForm.valid) {
      this.displayError = 'Invalid details';
      return;
    } else if (
      this.resetForm.value.password !== this.resetForm.value.confirmPassword
    ) {
      this.displayError = 'Passwords do not match';
      return;
    } else if (
      this._loginService.isLoginIdUnique(this.resetForm.value.username!)
    ) {
      this.displayError = 'Username must exist';
      return;
    }

    this._loginService.resetPassword(
      this.resetForm.value.username!,
      this.resetForm.value.password!
    );

    this._router.navigateByUrl('login');
  }

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm.valueChanges.subscribe(result => {
      this.displayError = undefined;
    });
  }
}
