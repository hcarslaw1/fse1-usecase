import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let service: LoginService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#submit should reset password and navigate to login if no errors in form', () => {
    service.userStore[2] = {
      id: 1,
      loginId: 'MOCK_USERNAME',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    };
    component.resetForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
    });

    component.submit();
    expect(service.userStore[2].password).toBe('MOCK_PASSWORD');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('login');
    expect(component.resetForm.valid).toBe(true);
  });

  it('#submit should set display errorcorrectly and not reset password if form invalid', () => {
    component.resetForm.setValue({
      username: '',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
    });

    component.submit();
    expect(component.resetForm.valid).toBe(false);
    expect(component.displayError).toBe('Invalid details');
  });

  it('#submit should set display error correctly if passwords different', () => {
    component.resetForm.setValue({
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD2',
    });

    component.submit();
    expect(component.displayError).toBe('Passwords do not match');
  });

  it('#submit should set display error correctly if username unique', () => {
    component.resetForm.setValue({
      username: 'MOCK_USERNAME2',
      password: 'MOCK_PASSWORD',
      confirmPassword: 'MOCK_PASSWORD',
    });

    component.submit();
    expect(component.displayError).toBe('Username must exist');
  });
});
