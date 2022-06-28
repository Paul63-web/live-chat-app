import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = environment.baseUrl;

  public userBaseUrl = environment.userBaseUrl;

  constructor(
    private _http: HttpClient,
    private _router: Router
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
  getuserDetails() {
    return this._http.get<any>(`${this.userBaseUrl}getUser`);
  }

  // function for viewing user profile
  userProfile() {
    return this._http.get<any>(`${this.userBaseUrl}profile`);
  }

  // function for view friends
  friends() {
    return this._http.get<any>(`${this.userBaseUrl}get-all-users`);
  }

  usersFriends() {
    return this._http.get<any>(`${this.userBaseUrl}users-friends`);
  }

  // funtin for sending friend request
  sendRequest(data:any) {
    return this._http.post<any>(`${this.userBaseUrl}send-request`, data);
  }

  //function for editing profile
  editProfile(data:String) {
    return this._http.post<any>(`${this.userBaseUrl}edit-profile`, data);
  }

  // function for signing out
  signOut(){
    localStorage.removeItem('Auth');
    this._router.navigate(['/login']);
  }
}
