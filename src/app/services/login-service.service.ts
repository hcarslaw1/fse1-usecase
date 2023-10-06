import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userStore: [User] = [
    {
      id: 1,
      loginId: 'admin',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
      email: 'email@email.com',
    },
  ];

  loggedInUser: User = {
    id: 0,
    loginId: '',
    password: '',
    isAdmin: false,
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
  };

  isEmailUnique = (email: string) => {
    return this.userStore.find(user => user.email === email) === undefined;
  };

  isLoginIdUnique = (loginId: string) => {
    return this.userStore.find(user => user.loginId === loginId) === undefined;
  };

  resetPassword = (newPassword: string) => {
    this.loggedInUser.password = newPassword;
    this.userStore[this.loggedInUser.id - 1] = this.loggedInUser;
  };

  retrieveUser = (loginId: string, password: string) => {
    let userDetails: User | undefined;
    this.userStore.forEach(user => {
      if (loginId === user.loginId && password === user.password) {
        userDetails = user;
      }
    });

    return userDetails;
  };

  createUser(
    loginId: string,
    password: string,
    firstName: string,
    lastName: string,
    contactNumber: string,
    email: string
  ) {
    const newUser = {
      id: this.userStore.length,
      loginId,
      password,
      isAdmin: false,
      firstName,
      lastName,
      contactNumber,
      email,
    } as User;

    this.userStore.push(newUser);
  }

  login = (loginId: string, password: string) => {
    const user = this.retrieveUser(loginId, password);
    if (user !== undefined) {
      this.loggedInUser = user;
    }
    return user;

    // if (user === undefined) {
    //   throw new Error('Incorrect login details');
    // } else {
    //   return user;
    // return user.isAdmin
    //   ? this._http.post('./update-product', { user })
    //   : this._http.post('./view-products', { user });
    // }
  };

  // constructor(private _http: HttpClient) {}
  constructor() {}
}

interface User {
  id: number;
  loginId: string;
  password: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}
