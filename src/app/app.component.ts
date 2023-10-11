import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Shopping App';

  isUserLoggedIn() {
    return this._loginService.loggedInUser !== undefined;
  }

  signOut() {
    this._loginService.signOut();
    this._router.navigateByUrl('login');
  }

  constructor(
    private _router: Router,
    private _loginService: LoginService
  ) {}
}
