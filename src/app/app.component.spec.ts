import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginService } from './services/login-service.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let service: LoginService;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    service = TestBed.inject(LoginService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Shopping App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Shopping App');
  });

  it('#isUserLoggedIn should return true if user logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
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
    expect(app.isUserLoggedIn()).toBe(true);
  });

  it('#isUserLoggedIn should return false if user not logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    service.loggedInUser = undefined;
    expect(app.isUserLoggedIn()).toBe(false);
  });

  it('#signOut should sign user out and navigate to login page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
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
    app.signOut();
    expect(service.loggedInUser).toBeUndefined();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('login');
  });
});
