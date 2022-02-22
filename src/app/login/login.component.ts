import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm = new FormGroup({});
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {


    if (!this.loginForm.valid) {
      return
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.isLoading = true;
      this.authService.signIn(email, password)
    }
    this.loginForm.reset()
  }

}
