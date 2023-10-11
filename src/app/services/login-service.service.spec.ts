import { TestBed } from '@angular/core/testing';

import { LoginService } from './login-service.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('#isEmailUnique should return true for unique email', () => {
    expect(service.isEmailUnique('test@test.com')).toBe(true);
  });

  it('#isEmailUnique should return false for existing email', () => {
    expect(service.isEmailUnique('email1@email.com')).toBe(false);
  });

  it('#isLoginIdUnique should return true for unique loginId', () => {
    expect(service.isLoginIdUnique('newLoginId')).toBe(true);
  });

  it('#isLoginIdUnique should return false for existing loginId', () => {
    expect(service.isLoginIdUnique('admin')).toBe(false);
  });

  it('#signOut should set loggedInUser to undefined', () => {
    service.loggedInUser = {
      id: 1,
      loginId: 'admin',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    };
    service.signOut();
    expect(service.loggedInUser).toBeUndefined();
  });

  it('#resetPassword should reset password when user logged in', () => {
    service.loggedInUser = {
      id: 1,
      loginId: 'admin',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    };
    service.resetPassword('admin', 'newPassword');
    expect(service.loggedInUser.password).toBe('newPassword');
    expect(service.userStore[0].password).toBe('newPassword');
  });

  it('#resetPassword should reset password when user not logged in', () => {
    service.loggedInUser = undefined;
    service.resetPassword('admin', 'newPassword');
    expect(service.userStore[0].password).toBe('newPassword');
  });

  it('#retrieveUser should return userDetails', () => {
    expect(service.retrieveUser('admin', 'test')).toEqual({
      id: 1,
      loginId: 'admin',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    });
  });

  it('#createUser should create new user', () => {
    service.createUser(
      'newUser',
      'password',
      'FirstName',
      'LastName',
      '012345',
      'email@test.com'
    );
    expect(service.userStore[2]).toEqual({
      id: 3,
      loginId: 'newUser',
      password: 'password',
      isAdmin: false,
      firstName: 'FirstName',
      lastName: 'LastName',
      contactNumber: '012345',
      email: 'email@test.com',
    });
  });

  it('#login should return user details', () => {
    expect(service.login('admin', 'test')).toEqual({
      id: 1,
      loginId: 'admin',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    });
  });
});
