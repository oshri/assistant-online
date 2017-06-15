import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { AuthService } from './services/auth.service';
import { Store } from './services/store/store';

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
    private store: Store,
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) { 

    this.iconRegistry.addSvgIcon(
        'quicApp',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/quicApp-icon.svg'));

  }

}
