import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public baseUrl = environment;
  constructor(private _http: HttpClient) {
    // register() {
    //   return 
    // }
  }
}
