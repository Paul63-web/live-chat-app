import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {

  public userDetails: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('googleAuth');
    if (storage) {
      this.userDetails = JSON.parse(storage);
    }else {
      this.signOut();
    }
  }
  
  signOut() : void {
    localStorage.removeItem('googleAuth')
    this.router.navigateByUrl('/login').then();
  }
}
