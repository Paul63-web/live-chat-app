import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public Auth = "";

  public loading = false;

  public loginFailed: any;

  public showFailed = false;

  constructor(
      private _fb: FormBuilder, 
      private _router: Router,
      private _auth: AuthService
    ) {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
   }

  ngOnInit(): void {
  }
  
  login(){
    this.loading = true;

    // check if loginForm is valid
    if (!this.loginForm.invalid) {
      console.log(this.loginForm.value);
      
      // destructure loginForm group into an object
      let userLoginDetails = {
        email: this.loginForm.controls.email.value,

        password: this.loginForm.controls.email.value
      };
    
      // Send api request through auth service
      this._auth.signIn(userLoginDetails).subscribe((res:any)=> {
        
        // check if loginSuccess is true
        if(res.loginSuccess = true) {

          // pass token into var Auth
          this.Auth = res.token;
          
          // Store token to localstorage
          localStorage.setItem("Auth", this.Auth);

          // Reset loginForm group
          this.loginForm.reset();

          // Redirect user to chat page
          this._router.navigate(["/chat"]);
        }

        // check if passwordmtachfailed is true
        if(res.passwordMatchFailed = true) {

          // pass loginFailed message into var loginFailed
          this.loginFailed = res.message;
          
          // change this.showFailed to true to display error message
          this.showFailed = true;

          // reset loginForm group
          this.loginForm.reset();

        }
      },
      
      err=>console.log(err)
      );
    }
   this.loading = false;
  }
}
