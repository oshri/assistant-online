import {  ChangeDetectionStrategy,
          Component,
          EventEmitter,
          Input,
          Output,
          ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'user-profile-dialog',
  styleUrls: ['userProfileDialog.component.scss'],
  templateUrl: 'userProfileDialog.component.html'
})

export class UserProfileDialogComponent {
  @Input() authenticated: boolean;
  user: any
  
  constructor(
    public auth: AuthService,
    public dialogRef: MdDialogRef<UserProfileDialogComponent>)
  {
    
  this.user = JSON.parse(localStorage.getItem('profile'));
  }

  get picture(){
    return this.user.picture_large || '';
  }

  get fullName(){
    return this.user.name;
  }

  logout(){
      this.auth.logout();
      this.dialogRef.close();
  }

}