import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
        headerName: 'Authorization',
        headerPrefix: 'bearer',
        tokenName: 'token',
		tokenGetter: (() => sessionStorage.getItem('id_token')),
		globalHeaders: [{'Content-Type':'application/json'}],
        noJwtError: true
	}), http, options);
}