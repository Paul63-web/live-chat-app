import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  public showSearchInp = false;

  constructor(
    private Auth: AuthService
  ) { }

  ngOnInit(): void {
    let getAuth = JSON.parse(localStorage.Auth)
    console.log(getAuth);
    
  }

  showSearch() {
    this.showSearchInp = true;
  }

}
