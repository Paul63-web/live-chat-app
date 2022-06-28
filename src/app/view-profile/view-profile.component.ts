import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  @Output() back: EventEmitter<boolean> = new EventEmitter;

  public goBack: boolean = false;

  public userDetails: any;

  public hasProfilePicture: boolean = false;

  public editProfileForm: FormGroup;

  public loading: boolean = false;

  public isEdit: boolean = false;

  public name: String = "";

  constructor(
    private Auth: AuthService,
    protected _fb: FormBuilder
  ) { 
    this.editProfileForm = this._fb.group({
      profile: ['', Validators.required],
      newName: [this.name, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.Auth.userProfile().subscribe(res=> {
      if(res.isAuthorized == true) {
        this.userDetails = res.message;
        if (this.userDetails.profilePicture == "") {
          console.log(this.userDetails.profilePicture);
        }else {
          this.hasProfilePicture = true;
        }
        this.loading = false;
      }else {
        this.goBack = true;
      }
    })
  }

  sendBack() {
    this.back.emit(this.goBack);
  }
  
  onFileSelected(event: any) {
  //   if(event.target.files.length > 0 ) {
  //     const file = event.target.files[0];
  //     this.editProfileForm.get('profile')?.setValue(file);
  //   }
  //   let imgFile = this.editProfileForm.controls.profile.value;
  //   const form = new FormData();
  //   form.append('file', imgFile);
  //   this.Auth.uploadProfilePix(form).subscribe(res=> {
  //     console.log(res);
  //   },
    
  //   err=>console.log(err)
  //   );
  }

  editName(name:String) {
    this.isEdit = true;
    this.name = name;
    console.log(this.name)
  }

  saveName(name: String) {
    let userNewName = this.editProfileForm.controls.newName.value;
    console.log(name + " " + userNewName)
    // this.Auth.editProfile(userNewName).subscribe(res=> {
    //   console.log(res)
    // },
    
    // err=>console.log(err)
    // );
  }

  editEmail(email: String) {
    this.isEdit = true;
    console.log(email);
  }

  editPhoneNumber(phoneNumber: Number) {
    this.isEdit = true;
    console.log(phoneNumber);
  }

  editUsername(username: String) {
    this.isEdit = true;
    console.log(username);
  }
}
