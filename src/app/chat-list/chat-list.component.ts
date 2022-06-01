import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @Output() friendData: EventEmitter<object> = new EventEmitter;
  
  // Variable to show wether firend is online or not
  public online = true;

  // Varible to determine clicked friend
  public clickedUser = false;

  // Variable for receive online user id
  public onlineUser: string = "";

  // Variable for housing firends
  public friends: any = [];

  // Path for friend with no profile picture
  public noProfile: string = '../../assets/avatar3.png';

  // NgModel variable for filtering friends
  public friendsFilter: string = '';

  // Variable for receiving message from the server
  public allFriends: any;

  // Variable for displaying spinner
  public loading: boolean = false;

  // Variable for displaying firends
  public filteredFriends: any;

  constructor(
    private _Auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    
    this.onlineUser = localStorage.onlineUser;
    
    this._Auth.usersFriends().subscribe(res=> {
      if (res.success == true) {
        res.message.filter((item: any)=> item._id !== JSON.parse(this.onlineUser));
        
        this.allFriends = res.message;
        
        this.friends = this.allFriends;
        // this.filterFriends.map((f:any)=> {
        //   f['']
        // });
        this.filteredFriends = this.friends;
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

  filterFriends() {
    let searchFriend = this.friendsFilter.toLowerCase();
    if (!searchFriend) this.filteredFriends = this.friends;
    this.filteredFriends = this.friends.filter((user:any)=>
      user.username.toLowerCase().includes(searchFriend))
  }
}
