import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @Output() friendData: EventEmitter<object> = new EventEmitter;

  public friendObj = {userName: "Paul Oluwaseyi Isola", profilePix: "../../assets/IMG_7027-1.JPG"}
  
  public online = true;

  public clickedUser = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendFriendData() {
    localStorage.setItem("clickedUser", JSON.stringify(this.clickedUser = true))
    this.friendData.emit(this.friendObj);
  }
}
