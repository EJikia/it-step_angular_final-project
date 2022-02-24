import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';


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
  user = new BehaviorSubject<any>(null)
  signUpURL = "http://localhost:3000/signup";
  signInURL = "http://localhost:3000/signin";
  constructor(private http: HttpClient, private router: Router) { }

  // getUsers() {

  //   this.http.get(this.signUpURL).subscribe(respData => {
  //     const usersData = respData;
  //   })
  // }

  signUp(username: string, email: string, firstName: string, lastName: string, password: string) {
    console.log("Shemovida")
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
            resData.user.id,
            resData.user.lastName,
            resData.user.username,
            resData.accessToken
          )
        })
      );
  }

  // logout() {
  //   this.user.next(null);
  //   this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');

  // }
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
    id: number,
    lastName: string,
    username: string,
    accessToken: string
  ) {

    const user = new User(email, firstName, id, lastName, username, accessToken);
    this.user.next(user);
    console.log(user)
    localStorage.setItem('userData', JSON.stringify(user))
  }


}
