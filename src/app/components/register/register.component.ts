import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  contactNumber = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);

  registerForm = this._fb.group({
    username: this.username,
    password: this.password,
    confirmPassword: this.confirmPassword,
    firstName: this.firstName,
    lastName: this.lastName,
    contactNumber: this.contactNumber,
    email: this.email,
  });

  displayError: undefined | string = undefined;

  submit() {
    if (!this.registerForm.valid) {
      this.displayError = 'Invalid details';
      return;
    } else if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.displayError = 'Passwords do not match';
      return;
    } else if (
      !this._loginService.isEmailUnique(this.registerForm.value.email!)
    ) {
      this.displayError = 'Email address must be unique';
      return;
    } else if (
      !this._loginService.isLoginIdUnique(this.registerForm.value.username!)
    ) {
      this.displayError = 'Username must be unique';
      return;
    }

    this._loginService.createUser(
      this.registerForm.value.username!,
      this.registerForm.value.password!,
      this.registerForm.value.firstName!,
      this.registerForm.value.lastName!,
      this.registerForm.value.contactNumber!,
      this.registerForm.value.email!
    );

    this._router.navigateByUrl('login');
  }

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(result => {
      this.displayError = undefined;
    });
  }
}
