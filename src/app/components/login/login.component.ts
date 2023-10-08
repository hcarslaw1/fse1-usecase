import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   username: new FormControl(''),
  // });

  loginForm = this._fb.group({
    username: [''],
    password: [''],
  });

  displayError = false;

  resetPassword() {
    this._router.navigateByUrl('reset-password');
  }

  register() {
    this._router.navigateByUrl('register');
  }

  submit() {
    // const loginResult = this._loginService.login(
    //   this.loginForm.value.username!,
    //   this.loginForm.value.password!
    // );

    // if(this.loginForm.)

    const user = this._loginService.login(
      this.loginForm.value.username!,
      this.loginForm.value.password!
    );

    if (user === undefined) {
      this.displayError = true;
    } else if (user.isAdmin) {
      this._router.navigateByUrl('update-products');
    } else {
      this._router.navigateByUrl('view-products');
    }

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
    this.loginForm.valueChanges.subscribe(result => {
      this.displayError = false;
    });
  }
}
