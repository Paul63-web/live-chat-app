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

  constructor(
    private _Auth: AuthService
  ) { }

  ngOnInit(): void {
    this.onlineUser = localStorage.onlineUser;
    this._Auth.friends().subscribe(res=> {
      if (res.success == true) {
        let allUsers = res.message;
        this.Friends = allUsers.filter((e:any)=>e._id !== JSON.parse(this.onlineUser))
      }
    })
  }

  goBackFromAddFriends() {
    this.goBackToMain.emit(this.backFromAdd);
  }

}
