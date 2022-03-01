import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map} from "rxjs/operators";
import { AbstractControl } from '@angular/forms';
import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomValidationsService {
  baseURL="http://localhost:3000/users"
  constructor(private http: HttpClient) { }

validateUsernameNotTaken(control: AbstractControl) {
  return this.checkUsernameNotTaken(control.value).pipe(
    map(res => {
      console.log(res, " dachekva usernames")
      return res ? null : { usernameTaken: true };
    })
  );
}

checkUsernameNotTaken(username: string) {
  return this.http.get<User[]>(this.baseURL).pipe(map((usernameList: Array<any>) => usernameList.filter(user => user.username === username)),
      map(users => !users.length));
}

checkEmailNotUsed(email: string){
  return this.http.get<User[]>(this.baseURL).pipe(map((emailList: Array<any>) => emailList.filter(user => user.email === email)),
    map(users => !users.length, ) );

}
validateEmailNotUsed(control: AbstractControl) {
  return this.checkUsernameNotTaken(control.value).pipe(map(res => {
    console.log(res, " dachekva")
    return res ? null : { emailUsed: true }
  }))
}
}




