import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userForm: FormGroup;

  public baseUrl = environment;

  constructor(
    private _fb: FormBuilder,

    private _router: Router,

    private _http: HttpClient
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
    let form = this.userForm.value;
    this._http.post<any>(`${this.baseUrl}register`, form).subscribe(res=> {
      console.log(res);
    },

    (err)=> {
      console.log(err);
    }
    )
  }
}
