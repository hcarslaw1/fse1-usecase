import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { LoginService } from 'src/app/services/login-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let loginService: LoginService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#submit should reset password and navigate to login if no errors in form', () => {
    component.registerForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });

    component.submit();
    expect(loginService.userStore[2]).toEqual({
      id: 3,
      loginId: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      isAdmin: false,
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('login');
    expect(component.registerForm.valid).toBe(true);
  });

  it('#submit should set display error correctly if form invalid', () => {
    component.registerForm.setValue({
      username: '',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });

    component.submit();
    expect(component.registerForm.valid).toBe(false);
    expect(component.displayError).toBe('Invalid details');
  });

  it('#submit should set display error correctly if passwords different', () => {
    component.registerForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD2',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });

    component.submit();
    expect(component.displayError).toBe('Passwords do not match');
  });

  it('#submit should set display error correctly if username not unique', () => {
    loginService.userStore[2] = {
      id: 1,
      loginId: 'MOCK_USERNAME',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    };

    component.registerForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });

    component.submit();
    expect(component.displayError).toBe('Username must be unique');
  });

  it('#submit should set display error correctly if email not unique', () => {
    loginService.userStore[2] = {
      id: 1,
      loginId: 'MOCK_USERNAME2',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'MOCK_EMAIL',
    };

    component.registerForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
      firstName: 'MOCK_FIRSTNAME',
      lastName: 'MOCK_LASTNAME',
      contactNumber: 'MOCK_CONTACT_NUMBER',
      email: 'MOCK_EMAIL',
    });

    component.submit();
    expect(component.displayError).toBe('Email address must be unique');
  });
});
