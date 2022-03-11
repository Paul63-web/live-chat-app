import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getStarted() {
    let randNum = Math.floor(Math.random() * 100000);
    if (randNum) {
      localStorage.setItem("appGuard", JSON.stringify(randNum));    
      this.router.navigate([`/signup`]);  
    }else {
      return;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
