import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public Auth: string = "";

  public loading: Boolean = false;

  public loginFailed: any;

  public showFailed: Boolean = false;

  public passwordText: Boolean = false;

  public passwordType: string = 'password';

  public passwordTextShown: Boolean = false;

  public showUserNotExist = false;

  public userNotExist: string = "";

  constructor(
      private _fb: FormBuilder, 
      private _router: Router,
      private _auth: AuthService,
      private authService: SocialAuthService
    ) {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
   }

  ngOnInit(): void {
  }

  viewPassword() {
    if (this.passwordTextShown) {
      this.passwordTextShown = false;
      this.passwordType = 'password';
    }
    this.passwordText = false;
  }

  hidePassword() {
    if (!this.passwordTextShown) {
      this.passwordTextShown = true;
      this.passwordType = 'text';
    }
    this.passwordText = true;
  }
  
  login(){

    // Change this.loading to true to display spinner
    this.loading = true;

    // check if loginForm is valid
    if (!this.loginForm.invalid) {
      console.log(this.loginForm.value);
      
      // destructure loginForm group into an object
      let userLoginDetails = {
        email: this.loginForm.controls.email.value,

        password: this.loginForm.controls.password.value
      };
    
      // Send api request through auth service
      this._auth.signIn(userLoginDetails).subscribe((res:any)=> {
        
        // check if loginSuccess is true
        if(res.success == true) {

          // pass token into var Auth
          this.Auth = res.token;
          
          // Store token to localstorage
          localStorage.setItem("Auth", this.Auth);

          // Reset loginForm group
          this.loginForm.reset();

          // Redirect user to chat page
          this._router.navigate(["/chat"]);

          // Reset Login Form
          this.loginForm.reset();
          
          // Change this.loading to false
          this.loading = false;
        }

        // check if passwordmtachfailed is true
        else if(res.success == false && res.wrongPassword == true) {
          console.log(res.message)

          // pass loginFailed message into var loginFailed
          this.loginFailed = res.message;
          
          // change this.showFailed to true to display error message
          this.showFailed = true;

          // reset loginForm group
          this.loginForm.reset();

          // Change this.loading to false
          this.loading = false;
        }else if(res.success = false || res.userNotExist == true) {

          console.log(res.message)
          // Assign res.message into this.userNotExist if user does not exist
          this.userNotExist = res.message;

          // Change this.showUserNotExist tot true to display alert
          this.showUserNotExist = true;
          
          // Reset login form
          this.loginForm.reset();

          // Change this.loading to false
          this.loading = false;
        }
      },
      
      // Console log httpError
      err=>console.log(err)
      );
    }
  }

  continueWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=> {
      localStorage.setItem("googleAuth", JSON.stringify(data));
      this._router.navigateByUrl('/dashboard').then();
    });
  }
}
