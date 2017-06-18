import { Store } from './store/store';
import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { tokenNotExpired } from 'angular2-jwt';
import { LoadingService } from '../modules/loading/loading.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';


declare var Auth0Lock: any;
@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {});
  userProfile;

  constructor(
    private loading: LoadingService,
    private snackbar: MdSnackBar,
    public router: Router,
    private store: Store)
  {

    
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.store.set('loggedinStatus', this.isAuthenticated());
    this.loading.setValue(true);

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        this.loading.setValue(false);
        if(error){
          this.showNotify('Errors', 'GETUSER');
          throw new Error(error);
        }

        this.setSession(authResult);
        localStorage.setItem("profile", JSON.stringify(profile));
        this.userProfile = profile;
        this.showNotify(this.userProfile.name, 'SIGNIN');
  
      });

    });

    this.lock.on('hide', () => {
      this.loading.setValue(false);
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.idTokenPayload.exp * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.store.set('loggedinStatus', this.isAuthenticated());
    this.router.navigate(['/builder/projects']);
  }

  private dropSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.store.set('loggedinStatus', this.isAuthenticated());
  }


  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public authenticated(){
    return tokenNotExpired();
  }

  login() :void{
    this.lock.show();
    this.loading.setValue(true);
  }

  logout() :void{
    this.dropSession();
    this.router.navigate(['/']);
  }

  showNotify(message: string, action: string) :void{
    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}