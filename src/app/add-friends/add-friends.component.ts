import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {
  @Output() goBackToMain: EventEmitter<boolean> = new EventEmitter;
  
  public backFromAdd: boolean = false;

  public Friends: any = [];

  public onlineUser: string = "";

  public allUsersFilter: string = "";

  public loading: boolean = false;

  public allUsers: any;

  constructor(
    private _Auth: AuthService
  ) { }

  ngOnInit(): void {
    this.onlineUser = localStorage.onlineUser;
    this._Auth.friends().subscribe(res=> {
      if (res.success == true) {
        this.allUsers = res.message;
        this.Friends = this.allUsers.filter((e:any)=>e._id !== JSON.parse(this.onlineUser))
      }
    })
  }

  goBackFromAddFriends() {
    this.goBackToMain.emit(this.backFromAdd);
  }

  addFriend(allUser: any) {
    console.log(allUser.username)
    let sender = this.allUsers.find((item:any)=> item._id == JSON.parse(this.onlineUser));
    let senderObj = {
      senderId: sender._id,
      senderEmail: sender.email
    };
    this._Auth.sendRequest(senderObj).subscribe(res=> {
      console.log(res);
    })
    this.loading = true;
  }

}
