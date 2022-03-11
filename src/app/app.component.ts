import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';

  constructor(private router: Router) {}

  ngOnInit():void {
    // let getLocal = JSON.parse(localStorage.user_details);
    // if(getLocal) {
    //   return;
    // }else {
    //   localStorage.setItem("user_details", "")
    // }

    // let getActive = localStorage.currentUser;
    // let getGuard = localStorage.appGuard;

    // if (getActive && getGuard) {
    //   this.router.navigate([`/home/news-feeds`]);
    // }else if (getGuard) {
    //   this.router.navigate([`/login`])
    // }else if(getGuard && !getActive){
    //   this.router.navigate([`/register`])
    // }else {
    //   return;
    // }
  }

  // arr: Number[] = [1,4,3,5,7,9,8];
  nameArr: String[] = ["Paul", "Oluwaseyi", "Iyanu", "Dayo"];

  // del(index:Number) {
  //   this.arr = this.arr.filter((item, i)=>i!==index);
  // }

  deleteName(index: Number) {
    this.nameArr = this.nameArr.filter((item, i)=> i!==index)
  }
}
