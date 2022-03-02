import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

export interface AuthResponseData {
  accessToken: string,
  user: {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    id: number
  }
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user = new BehaviorSubject<any>(null);
  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string
  userId!: number;
  jwtHelper = new JwtHelperService();

  signUpURL = "http://localhost:3000/users";
  signInURL = "http://localhost:3000/signin";
  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem('user');
    if (user != null) {
      const userData = JSON.parse(user);
      this.userId = userData.id;
      this.username = userData.username;
      this.firstName = userData.firstName;
      this.email = userData.email;
      this.lastName = userData.lastName;
    }

    // if (userData !== "") {
    //   this.
    // }

  }

  getUserData() {
    return this.http.get(`${this.signUpURL}/${this.userId}`)

  }
  signUp(username: string, email: string, firstName: string, lastName: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.signUpURL,
        {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }
  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signInURL,
      {
        email: email,
        password: password
      }
    )
      .pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuthentication(
            resData.user.email,
            resData.user.firstName,
            resData.user.lastName,
            resData.user.username,
            resData.accessToken,
            resData.user.id

          )
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token || undefined);
  }


  getDecodedToken() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token') || undefined);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('id');

  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes || !errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
      case 'Email already exists':
        errorMessage = 'This email already exists ';
        break;
      case 'Cannot find user':
        errorMessage = 'This email does not exist.';
        break;
      case 'Incorrect password':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
  private handleAuthentication(
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    accessToken: string,
    id: number
  ) {

    const user = new User(email, firstName, lastName, username, accessToken, id);
    this.user.next(user);
    this.userId = id;
    this.username = username;
    this.firstName = firstName;
    this.email = email;
    this.lastName = lastName;
    localStorage.setItem('token', JSON.stringify(user.accessToken))
    localStorage.setItem('user', JSON.stringify(user))

  }
  updateUser(id: number, email: string, username: string, firstName: string, lastName: string,) {
    this.http.patch(`${this.signUpURL}/${id}`, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      username: username,
    }).subscribe((resData: any) => {
      this.email = resData.email,
        this.username = resData.username,
        this.firstName = resData.firstName,
        this.lastName = resData.lastName,
        alert("Updated sucessfully")

    })
  }
}
