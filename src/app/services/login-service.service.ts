import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userStore: [User] = [
    {
      loginId: 'admin',
      password: 'test',
      isAdmin: true,
      firstName: 'First',
      lastName: 'Last',
      contactNumber: '0123456789',
    },
  ];

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
    contactNumber: string
  ) {
    const newUser = {
      loginId,
      password,
      isAdmin: false,
      firstName,
      lastName,
      contactNumber,
    } as User;

    this.userStore.push(newUser);
  }

  login = (loginId: string, password: string) => {
    const user = this.retrieveUser(loginId, password);
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
  loginId: string;
  password: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  contactNumber: string;
}
