import {  ChangeDetectionStrategy,
          Component,
          EventEmitter,
          Input,
          Output,
          ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
    private auth: AuthService)
  {
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  get picture(){
    return this.user.picture || '';
  }

  get fullName(){
    return this.user.name;
  }
}