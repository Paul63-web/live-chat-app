import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userForm: FormGroup;

  public baseUrl = environment.baseUrl;

  public Auth = "";

  public loading = false;

  public userExist: any;

  public showExist = false;

  public success: any;

  public showSuccess = false;

  public submitted = false;

  constructor(
    private _fb: FormBuilder,

    private _router: Router,

    private _http: HttpClient,

    private _auth: AuthService
    ) {

    this.userForm = this._fb.group({
      fullName: ['', Validators.required],
      eMail: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
   }

  ngOnInit(): void {

  }

  submitForm() {
    this.submitted = true;

    // Check if userForm group is valid
    if (this.userForm.valid) {
      
      let fullName = this.userForm.controls.fullName.value;
      
      let eMail = this.userForm.controls.eMail.value;
      
      let mobileNumber = this.userForm.controls.mobileNumber.value;
      
      let userName = this.userForm.controls.userName.value;
      
      let password = this.userForm.controls.password.value;

      // Destructue userForm group into an object
      let userObj = {
        fullName,
  
        eMail,
  
        mobileNumber,
  
        userName,
  
        password
      }
  
      // Change this.loading to true to display spinner
      this.loading = true;
      
      // Send registration api request through Auth service
      this._auth.signUp(userObj).subscribe((res: any)=> {

        // Check if user exist
        if(res.userExixt == true) {

          // pass user exist message into this.userExist
          this.userExist = res.message;
          
          // Change this.showExist to true to display error message
          this.showExist = true;
        }
        
        // Check if registration is sccuessful
        else if(res.success == true){

          // Change this.showExist to false to hide userExist error message to hide it 
          this.showExist = false;

          // pass token into this.Auth
          this.Auth = res.token;

          // Save this.Auth to localStorage
          localStorage.setItem("Auth", this.Auth);

          // Change this.showExist to false
          this.showExist = false;

          // Change this.showSuccess to true to display success message 
          this.showSuccess = true;

          // Assign success message to this.success
          this.success = res.message;          
        }
        this.loading = false;
      },
      
      err=>console.log(err)
      );
    }else {
      console.log("err");
    }
  }
}
