import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'quic-app',
  template:`
    <loading></loading>
    <router-outlet></router-outlet>
  `
})
export class QuicAppComponent {

  constructor(public auth: AuthService) { }

}
