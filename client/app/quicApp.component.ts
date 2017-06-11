import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'quic-app',
  template:`
    <loading></loading>
    <app-header [authenticated]="auth.isAuthenticated()"></app-header>
    <router-outlet></router-outlet>
  `
})
export class QuicAppComponent {

  constructor(public auth: AuthService) { }

}
