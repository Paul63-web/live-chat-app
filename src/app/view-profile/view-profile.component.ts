import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  public uploadForm: FormGroup;

  constructor(
    private Auth: AuthService,
    protected _fb: FormBuilder
  ) { 
    this.uploadForm = this._fb.group({
      profile: ['']
    });
  }

  ngOnInit(): void {
    this.Auth.userProfile().subscribe(res=> {
      if(res.isAuthorized == true) {
        this.userDetails = res.message;
        if (this.userDetails.profilePicture == "") {
          console.log(this.userDetails.profilePicture);
        }else {
          this.hasProfilePicture = true;
        }
      }else {
        this.goBack = true;
      }
    })
  }

  sendBack() {
    this.back.emit(this.goBack);
  }
  
  onFileSelected(event: any) {
    if(event.target.files.length > 0 ) {
      const file = event.target.files[0];
      this.uploadForm.get('profile')?.setValue(file);
    }
    let imgFile = this.uploadForm.controls.profile.value;
    const form = new FormData();
    form.append('file', imgFile);
    this.Auth.uploadProfilePix(form).subscribe(res=> {
      console.log(res);
    },
    
    err=>console.log(err)
    );
  }
}
