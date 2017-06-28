import { Store } from '../store/store';
import { Injectable } from '@angular/core';
import { AUTH0_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { LoadingService } from '../../modules/loading/loading.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Http, Headers, RequestOptions } from '@angular/http';



declare var Auth0Lock: any;
@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CONFIG.clientID, AUTH0_CONFIG.domain, {});
  userProfile;

  constructor(
    private loading: LoadingService,
    private snackbar: MdSnackBar,
    public router: Router,
    private http: Http,
    private store: Store)
  {

    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.store.set('loggedinStatus', this.isAuthenticated());
    this.loading.setValue(true);

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        this.loading.setValue(false);
        if (error) {
          this.showNotify('Errors', 'GETUSER');
          throw new Error(error);
        }

        this.setSession(authResult, profile);
        this.userProfile = profile;
        this.showNotify(this.userProfile.name, 'SIGNIN');
      });

      
      this.quicAppServerInitialAuthenticated();
      
    });

    this.lock.on('hide', () => {
      this.loading.setValue(false);
    });
  }

  private quicAppServerInitialAuthenticated(){
    const postData = {
      grant_type: AUTH0_CONFIG.grantType,
      client_id: AUTH0_CONFIG.clientID,
      client_secret: AUTH0_CONFIG.clientSecret,
      audience: AUTH0_CONFIG.quicAppDomain
    }

    this.http.post(AUTH0_CONFIG.oauthTokenUrl, postData).subscribe(
      (data) => {
        const server_token = data.json().access_token;
        localStorage.setItem('server_token', server_token);

        this.http.post('http://localhost:4200/api/authorization', { profile: localStorage.getItem("profile")}).
          subscribe(
            (logged) => console.log("logged", logged)
            ,(fail) => console.error("failed", fail));
      },

      (error) => console.error("Error", error));
  }

  private setSession(authResult, profile): void {
    localStorage.setItem("profile", JSON.stringify(profile));
    const expiresAt = JSON.stringify((authResult.idTokenPayload.exp * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.store.set('loggedinStatus', this.isAuthenticated());
    this.router.navigate(['/dashboard']);
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

  public authenticated() {
    return tokenNotExpired();
  }

  login(): void {
    this.lock.show();
    this.loading.setValue(true);
  }

  logout(): void {
    this.dropSession();
    this.router.navigate(['/']);
  }

  showNotify(message: string, action: string): void {
    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}