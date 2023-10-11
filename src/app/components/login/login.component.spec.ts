import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#resetPassword should redirect to reset-password screen', () => {
    component.resetPassword();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('reset-password');
  });

  it('#register should redirect to register screen', () => {
    component.register();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('register');
  });

  it('#submit should log admin user in and redirect to update-products screen', () => {
    loginService.userStore[2] = {
      id: 3,
      isAdmin: true,
      loginId: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    };

    component.loginForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
    });
    component.submit();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('update-products');
    expect(loginService.loggedInUser).toEqual({
      id: 3,
      isAdmin: true,
      loginId: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });
  });

  it('#submit should log customer user in and redirect to update-products screen', () => {
    loginService.userStore[2] = {
      id: 3,
      isAdmin: false,
      loginId: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    };

    component.loginForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
    });
    component.submit();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('view-products');
    expect(loginService.loggedInUser).toEqual({
      id: 3,
      isAdmin: false,
      loginId: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });
  });

  it('#submit should set display error as true when user not logged in', () => {
    loginService.userStore[2] = {
      id: 3,
      isAdmin: false,
      loginId: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    };
    component.loginForm.setValue({
      username: 'MOCK_USERNAME2',
      password: 'MOCK_PASSWORD',
    });
    component.submit();
    expect(component.displayError).toBe(true);
  });
});
