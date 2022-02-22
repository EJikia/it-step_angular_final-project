import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface AuthResponseData {
  accessToken: string,
  user: {
    email: string,
    firstName: string,
    id: number
    lastName: string,
    username: string
  }
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  baseURL = "http://localhost:3000/users"
  constructor(private http: HttpClient) { }

  getUsers() {

    this.http.get(this.baseURL).subscribe(respData => {
      const usersData = respData;
    })
  }

  signUp(username: string, email: string, firstName: string, lastName: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.baseURL,
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
  signIn(email: string, password: string) {

  }



}
