import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @Output() friendData: EventEmitter<object> = new EventEmitter;
  
  public online = true;

  public clickedUser = false;

  public onlineUser: string = "";

  public userFriends: any = [];

  public noProfile: string = '../../assets/avatar3.png';

  public friendsFilter: string = '';

  public loading: boolean = false;

  constructor(
    private _Auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.onlineUser = localStorage.onlineUser;
    this._Auth.usersFriends().subscribe(res=> {
      if (res.success == true) {
        let userFriends = res.message;
        this.userFriends = userFriends.filter((item: any)=> item._id !== JSON.parse(this.onlineUser));
        this.loading = false; 
      }
    },
    err=>{
      console.log(err)
      this.loading = false
    }
    )
  }
  
  sendFriendData(userFriend: any) {
    let friendObj = {userName: userFriend.username, profilePix: userFriend.profilePix}
    localStorage.setItem("clickedUser", JSON.stringify(this.clickedUser = true))
    this.friendData.emit(friendObj);
  }
}
