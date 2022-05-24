import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  public date = new Date();

  public showSearchInp: boolean = false;

  public searchDisplayed: boolean = false;

  public online: boolean = true;

  public friend: any;

  public friendProfilePix: string = "";

  public clicked: any;

  public messageArray: Array<Object> = [];

  public getMessages: Array<object> = [];

  public message: string = "";

  public messageObj: Object = {};

  public msgId:number = 1;

  public theme: string = "";

  public bacgroundImg: string = "";

  public viewProfileComponent: boolean = false;

  public addFriendsCompo: boolean = false;

  public notificationsCompnent: boolean = false;

  public settingsComponent: boolean = false;

  constructor(
    private Auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    // Get theme from localStorage
    this.theme = JSON.parse(localStorage.theme);
    console.log(this.theme)

    // Check if theme is dark or light
    if(this.theme == "dark") {
      console.log("them is dark");
      this.bacgroundImg = '../../assets/wp_132.jpg'
    }

    // this.messageArray = JSON.parse(localStorage.messages);
  
    // console.log(this.messageArray);

    this.Auth.getuserDetails().subscribe(res=> {
      console.log(res)
      const userDetails = res.message; 
      localStorage.setItem("onlineUser", JSON.stringify(userDetails.userId));
    },
    
    err=>console.log(err)
    );
  }

  receiveFriendData(data: any) {
    this.clicked = localStorage.getItem("clickedUser");
    this.friend = data;
    this.friendProfilePix = this.friend.profilePix;
  }

  toPreviousPage1(goBack: boolean) {
    this.viewProfileComponent = goBack;
  }

  toPreviousPage2(back: boolean) {
    this.addFriendsCompo = back;
  }

  toPreviousPage3(backFromNotifications: boolean) {
    this.notificationsCompnent = backFromNotifications;
  }

  toPreviousPage4(backFromSettings: boolean) {
    this.settingsComponent = backFromSettings;
  }

  showSearch() {
    this.showSearchInp = true;
    this.searchDisplayed = true;
  }

  cancelSearch() {
    this.showSearchInp = false;
    this.searchDisplayed = false;
  }

  sendMessage() {
    // this.messageArray = localStorage.messages ? JSON.parse(localStorage.messages) : [];
    
    console.log(this.message);
    let chatHrs = this.date.getHours();
    let chatMin = this.date.getMinutes();
    let chatSec = this.date.getSeconds()
    let time = `${chatHrs}:${chatMin}:${chatSec}`;
    let id = this.msgId++;
    let message = this.message;
    this.messageObj = {id, reciver: this.friend.userName, message, time};
    this.messageArray.push(this.messageObj);
    this.getMessages.push(this.messageObj);
    console.log(this.getMessages)
    localStorage.setItem("messages", JSON.stringify(this.messageArray));
    this.message = "";
  }

  signOut() {
    localStorage.removeItem("Auth")
    this._router.navigateByUrl('/login');
  }

  viewProfile() {
    this.addFriendsCompo = false;
    this.notificationsCompnent = false;
    this.viewProfileComponent = true;
    this.settingsComponent = false;
  }

  addFriends() {
    this.viewProfileComponent = false;
    this.notificationsCompnent = false;
    this.addFriendsCompo = true;
    this.settingsComponent = false;
  }

  notificationsCompo() {
    this.addFriendsCompo = false;
    this.viewProfileComponent = false;
    this.notificationsCompnent = true;
    this.settingsComponent = false;
  }

  goToSettings() {
    this.addFriendsCompo = false;
    this.viewProfileComponent = false;
    this.notificationsCompnent = false;
    this.settingsComponent = true;
  }

}
