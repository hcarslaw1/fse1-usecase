import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userStore: User[] = [
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
    {
      id: 2,
      loginId: 'customer',
      password: 'test',
      isAdmin: false,
      firstName: 'FirstCustomer',
      lastName: 'LastCustomer',
      contactNumber: '01234567890',
      email: 'email1@email.com',
    },
  ];

  loggedInUser: User | undefined = undefined;

  isEmailUnique = (email: string) => {
    return this.userStore.find(user => user.email === email) === undefined;
  };

  isLoginIdUnique = (loginId: string) => {
    return this.userStore.find(user => user.loginId === loginId) === undefined;
  };

  signOut = () => {
    this.loggedInUser = undefined;
  };

  resetPassword = (username: string, newPassword: string) => {
    if (this.loggedInUser !== undefined) {
      this.loggedInUser.password = newPassword;
      this.userStore[this.loggedInUser.id - 1] = this.loggedInUser;
    } else {
      const user = this.userStore.find(user => user.loginId === username);

      if (user !== undefined) {
        user.password = newPassword;
        this.userStore[user.id - 1] = user;
      }
    }
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
      id: this.userStore.length + 1,
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
  };

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
