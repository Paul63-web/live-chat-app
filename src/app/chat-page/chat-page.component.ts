import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  public showSearchInp = false;

  public searchDisplayed = false;

  public online = true;

  public friend: any;

  public friendProfilePix = "";

  public clicked: any;

  constructor(
    private Auth: AuthService
  ) { }

  ngOnInit(): void {
    let getAuth = localStorage.Auth;

    console.log(getAuth)

    this.Auth.getuserDetails(getAuth).subscribe(res=> {
      console.log(res)
    },
    
    err=>console.log(err)
    );
  }

  receiveFriendData(data: any) {
    this.clicked = localStorage.getItem("clickedUser")
    this.friend = data;
    // this.friendProfilePix = data.profilePix;
    this.friendProfilePix = this.friend.profilePix;
  }

  showSearch() {
    this.showSearchInp = true;
    this.searchDisplayed = true;
  }

}
