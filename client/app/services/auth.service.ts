import { Store } from './store/store';
import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { tokenNotExpired } from 'angular2-jwt';
import { LoadingService } from '../modules/loading/loading.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Http, Headers, RequestOptions } from '@angular/http';



declare var Auth0Lock: any;
@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {});
  userProfile;

  constructor(
    private loading: LoadingService,
    private snackbar: MdSnackBar,
    public router: Router,
    private http: Http,
    private store: Store) {


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

        this.setSession(authResult);
        localStorage.setItem("profile", JSON.stringify(profile));
        this.userProfile = profile;
        this.showNotify(this.userProfile.name, 'SIGNIN');

      });

      var options = {
        method: 'POST',
        url: 'https://quicappdev.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body:
        {
          grant_type: 'client_credentials',
          client_id: 'XBjb2yjLKFOr7BhPUHltDaSnEVDL9SNh',
          client_secret: 'pnThqha-SORZJBkGdMYPUQOp3_TNcL2Lg_os0OchmFcaS0n__SkJjowUzNW1ZQsI',
          audience: 'https://www.quicapp.com'
        },
        json: true
      };

      this.http.post('https://quicappdev.auth0.com/oauth/token', {
        grant_type: 'client_credentials',
        client_id: 'XBjb2yjLKFOr7BhPUHltDaSnEVDL9SNh',
        client_secret: 'pnThqha-SORZJBkGdMYPUQOp3_TNcL2Lg_os0OchmFcaS0n__SkJjowUzNW1ZQsI',
        audience: 'https://www.quicapp.com'
      }).subscribe(
        data => {
          let server_token = data.json().access_token;
          console.log("Token Data", server_token);
          localStorage.setItem('server_token', server_token);
          var postOptions = {
            url: 'http://localhost:4200/api/timesheet',
            method: 'POST',
            headers: new Headers({ 'Authorization': `Bearer ${server_token}` }),
          };
          this.http.post('http://localhost:4200/api/timesheet', {}, postOptions).
            subscribe(logged => console.log("logged", logged), fail => console.error("failed", fail))
        },
        error => console.error("Error", error));
      // "{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5ERkROVEpDTWpNMFJVWXhPVEExUlRoR1FrWTRPVE5ETXpSRk1qaERNa1pEUWpKQ01EUTRSUSJ9.eyJpc3MiOiJodHRwczovL3F1aWNhcHBkZXYuYXV0aDAuY29tLyIsInN1YiI6IlhCamIyeWpMS0ZPcjdCaFBVSGx0RGFTbkVWREw5U05oQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3d3dy5xdWljYXBwLmNvbSIsImV4cCI6MTQ5ODA3MDk3NywiaWF0IjoxNDk3OTg0NTc3LCJzY29wZSI6IiJ9.zF5WwYJxL2PyNwUu-17K69Wh5bcbRqc_FjnLx0sT9NBDKE7jIa5ArZ8Ltbpoc-MF-UIQoCEghjDhCEhWaUDBHW9gVwic1AbWYx8PMiS1dAqGK8G3VN-Kcg4UW7k3sS74_UcioPhifLpM6YrIRpVn1RI2qDu62Z_1B6kDLAgq8QMU6UaLyOAYy_l--LiDbs9trYoPMNrneSN8arZ-mO5wpnMkLPsy56F-KQdR70Pa41YHVTd8_ovoi-ueqsZR52xbQDZYxsJ7iiKi6MzzeEljQFN3z1um_ytb0P5zlxcNr1Eyn_7QALl7kaE_iuR7WTkSaZEEvO4DazpdF0f0foQD6Q","expires_in":86400,"token_type":"Bearer"}"
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