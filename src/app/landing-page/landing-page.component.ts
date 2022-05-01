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

  // Route to get started
  getStarted() {

    // Generate a random number to guard application
    let randNum = Math.floor(Math.random() * 100000);

    // Check if random number is generation is successful
    if (randNum) {

      // Set random number to localStorage
      localStorage.setItem("appGuard", JSON.stringify(randNum));    

      // Redirect to signup page
      this.router.navigate([`/signup`]);  
    }else {
      return;
    }
  }

  // Function to redirect login page
  goToLogin() {

    // Redirect to logi page
    this.router.navigate(['/login']);
  }
}
