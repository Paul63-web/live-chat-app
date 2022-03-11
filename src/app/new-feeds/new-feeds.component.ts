import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-feeds',
  templateUrl: './new-feeds.component.html',
  styleUrls: ['./new-feeds.component.css']
})
export class NewFeedsComponent implements OnInit {

  fileName = "";
  proPic = "";
  profilePicture = false;
  image = "";
  constructor() { }

  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.currentUser));
    // if (!localStorage.user_details) {
    // localStorage.setItem("image", "")      
    // }
    // else {
      let getImg = JSON.parse(localStorage.user_details);
      // this.image = getImg.profilePix;
      // let img = getImg.profilePix;
      console.log(getImg)
      for (let i = 0; i < getImg.length; i++) {
        this.image = getImg[i].profilePix;
        console.log(this.image)
      }
    // }
  }

  onFileSelected(event:any) {
    const file : File = event.target.files[0];
    console.log(file)
  }
  
  getImage(imageInp: any) {
    const reader = new FileReader();
    reader.addEventListener("load", ()=> {
      let userIndex = JSON.parse(localStorage.user_details);
      console.log(userIndex)
      let getCurrent = JSON.parse(localStorage.currentUser);
      let userInd = userIndex.find((user:any)=> user.userId == getCurrent.id);
      console.log(reader.result);
      if (userInd) {
        userInd.profilePix = reader.result;
        localStorage.setItem("user_details", JSON.stringify(userIndex));
        let getImg = JSON.parse(localStorage.user_details);
        for (let i = 0; i < getImg.length; i++) {
          this.image = getImg[i].profilePix;   
          console.log(this.image)       
        }
      }else {
        console.log("error uploading file")
      }
    })
    reader.readAsDataURL(imageInp.files[0]);
    this.ngOnInit();
  }
}
