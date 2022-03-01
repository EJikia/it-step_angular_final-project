import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidationsService } from '../services/custom-validations.service';
import { ConfirmPasswordValidator } from './passwords.validator';
import * as alertyfy from 'alertifyjs';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit {
  isLoading = false;
  error: string = "";
  regForm = new FormGroup({});

  constructor(private router: Router, private authService: AuthService, private customValidatorsService: CustomValidationsService, private formBuilder: FormBuilder) {
    this.regForm = formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(24)], this.customValidatorsService.validateUsernameNotTaken.bind(this.customValidatorsService)),
      email: new FormControl('', [Validators.required, Validators.email], this.customValidatorsService.validateEmailNotUsed.bind(this.customValidatorsService)),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      rePassword: new FormControl('', Validators.required),
      checkbox: new FormControl(false, Validators.requiredTrue)
    },
      {
        validator: ConfirmPasswordValidator("password", "rePassword")
      }
    );
  }

  ngOnInit(): void {
  }
  onSubmit() {
    const email = this.regForm.value.email;
    const password = this.regForm.value.password;
    const firstName = this.regForm.value.firstName;
    const lastName = this.regForm.value.lastName;
    const username = this.regForm.value.username;

    this.isLoading = true;

    this.authService.signUp(username, email, firstName, lastName, password).subscribe(resData => {
    alertyfy.success('You are successfully registered');
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(["/login"])
    },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });
    this.regForm.reset()

  }
}
