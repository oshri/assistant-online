import {  ChangeDetectionStrategy,
          Component,
          EventEmitter,
          Input,
          Output,
          ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserProfileDialogComponent } from './../userProfileDIalog/userProfileDialog.component';



@Component({
  selector: 'user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent {
  @Input() authenticated: boolean;
  user: any
  
  constructor(
    public auth: AuthService,
    public dialog: MdDialog)
  {
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  get picture(){
    return this.user.picture || '';
  }

  get fullName(){
    return this.user.name;
  }

  openDialog() {
    let dialogRef = this.dialog.open(UserProfileDialogComponent,{
          width: '400px',
          height: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}