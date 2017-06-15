import { Store } from './services/store/store';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'quic-app',
  template:`
    <loading></loading>
    <app-header [authenticated]="loggedinStatus$ | async"></app-header>
    <router-outlet></router-outlet>
  `
})
export class QuicAppComponent {
  loggedinStatus$ = this.store.select<any>('loggedinStatus');

  constructor(
    public auth: AuthService,
    private store: Store) { 

  }

}
