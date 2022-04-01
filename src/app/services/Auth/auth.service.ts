import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient
  ) { }

  // function for signing up
  signUp(data: any) {
    return this._http.post<any>(`${this.baseUrl}register`, data);
  }

  // function for logging in
  signIn(data: any) {
    return this._http.post<any>(`${this.baseUrl}login`, data);
  }

  // function for getting userdatails
  getuserDetails(data: any) {
    return this._http.get<any>(`${this.baseUrl}getUser`, {
      headers: {
        authorization: `Bearer ${data}`
      }
    });
  }
}
