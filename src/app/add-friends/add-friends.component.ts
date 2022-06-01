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

  // Array for housing all users
  public Friends: any = [];

  // variable for reciveing online userId
  public onlineUser: string = "";

  // NgModel variable for filtering friends
  public allUsersFilter: string = "";

  // Variable for showing pulse
  public loading: boolean = false;

  //Varibale for receiving message from the server
  public allUsers: any;
  
  // Variable for displaying users
  public filteredUsers: any;

  public friendRequest: any;

  constructor(
    private _Auth: AuthService
  ) { }

  ngOnInit(): void {
    this.onlineUser = localStorage.onlineUser;

    this._Auth.friends().subscribe(res=> {

      if (res.success == true) {
        res.message.filter((item:any)=>item._id !== JSON.parse(this.onlineUser));

        this.allUsers = res.message;

        this.Friends = this.allUsers;

        this.Friends.map((f:any) => {
          f['loading'] = false;
        });

        this.filteredUsers = this.Friends;
      }
    })
  }

  goBackFromAddFriends() {
    this.goBackToMain.emit(this.backFromAdd);
  }

  addFriend(allUser: any) {
    console.log(allUser.username);

    let friendIndex = this.Friends.findIndex((f:any) => f._id == allUser._id);

    this.Friends[friendIndex].loading = true;

    let filterIndex = this.filteredUsers.findIndex((f:any) => f._id == allUser._id);

    this.filteredUsers[filterIndex].loading = true;

    let sender = this.allUsers.find((item:any)=> item._id == JSON.parse(this.onlineUser));

    this.friendRequest = {
      senderId: sender._id,
      senderEmail: sender.email,
      senderUsername: sender.username,
      receiverId: allUser._id,
      receiverEmail: allUser.email,
      receiverUsername: allUser.username
    };
    console.log(this.friendRequest);
    
    this._Auth.sendRequest(this.friendRequest).subscribe(res=> {
      if (res!=null) {
        console.log(res);
        this.filteredUsers[filterIndex].loading = false;        
      }
    });
  }

  // Function for filtering users
  filterUsers(){
    let searchUser = this.allUsersFilter.toLowerCase();
    
    if(!searchUser) this.filteredUsers = this.Friends;
    
    this.filteredUsers = this.Friends.filter((user:any)=>
      user.fullname.toLowerCase().includes(searchUser) ||
      user.username.toLowerCase().includes(searchUser))
    }
}

