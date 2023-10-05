import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm = this._fb.group({
    username: [''],
    password: [''],
    firstName: [''],
    lastName: [''],
    contactNumber: [''],
  });

  displayError = false;

  submit() {
    // const loginResult = this._loginService.login(
    //   this.loginForm.value.username!,
    //   this.loginForm.value.password!
    // );

    this._loginService.createUser(
      this.registerForm.value.username!,
      this.registerForm.value.password!,
      this.registerForm.value.firstName!,
      this.registerForm.value.lastName!,
      this.registerForm.value.contactNumber!
    );

    this._router.navigateByUrl('login');

    // this._loginService
    //   .login(this.loginForm.value.username!, this.loginForm.value.password!)
    //   .subscribe(
    //     result => {
    //       this._router.navigate
    //     },
    //     err => {
    //       this.displayError = true;
    //     }
    //   );

    // loginResult.subscribe(result => {

    // })
    // }
  }

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(result => {
      this.displayError = false;
    });
  }
}
