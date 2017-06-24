import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';


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
    private http: Http) {
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  get picture() {
    return this.user.picture || '';
  }

  get fullName() {
    return this.user.name;
  }

  getAllCats() {
    let options = {
      // headers: new Headers({ authorization: 'Bearer ' + localStorage.getItem('id_token')})
      headers: new Headers({ authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5ERkROVEpDTWpNMFJVWXhPVEExUlRoR1FrWTRPVE5ETXpSRk1qaERNa1pEUWpKQ01EUTRSUSJ9.eyJpc3MiOiJodHRwczovL3F1aWNhcHBkZXYuYXV0aDAuY29tLyIsInN1YiI6IlhCamIyeWpMS0ZPcjdCaFBVSGx0RGFTbkVWREw5U05oQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3d3dy5xdWljYXBwLmNvbSIsImV4cCI6MTQ5Nzc5OTEzNywiaWF0IjoxNDk3NzEyNzM3LCJzY29wZSI6IiJ9.J791slYzpc4fzIhATLykXB5_CF_TeVnjwc4QO7OXHZEtu4gvoc00dlrIZQ6VMl2DSie1vlP52VMKGdDSUyymy9LkcwHYv9CzRL2EmE80UP6TdkeDbnu09NT4iGR7K5TG4X0GMS5uRqflEZb-ipp8VvP4a8DCY1Ve-Zb5HLkvLf4dR_QIqrkku0cBOSucZk7wE72keSPI32b2fwkdHeVUqvOiTJP2eKhQHkLRsNeLASq3z3HQeo4MFECHZd-KWg4x1mSrCJANOPUzDvrj59ht2yPclu29WVDF_icKr7YEBLBdnjIc8gKCR4A8CJxuD5FIUPcsHAavjxXNpuIvRtg9xQ'}),
      body: `{"client_id":"${localStorage.getItem('id_token')}","client_secret":"pnThqha-SORZJBkGdMYPUQOp3_TNcL2Lg_os0OchmFcaS0n__SkJjowUzNW1ZQsI","audience":"https://www.quicapp.com","grant_type":"client_credentials"}` 
    }

    let result = this.http.get('http://localhost:4200/api/cats', options).map(this.extractData)
                     .catch(this.handleError);
    result.subscribe(data => {
      console.log("Fuck youooo", data);
    }, error => {
      console.log("Got Error", error);
    });
  }

  private extractData(res: Response) {
    console.log('Result', res);

    let body = res.json();
    console.log('Result', body);
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}