import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HttpClient {

    constructor(private http: AuthHttp) { }

    createAuthorizationHeader(headers: Headers) {
        const token = localStorage.getItem('access_token');
        console.log('got token', token);
        if (token) {
            headers.append('Authorization', 'Bearer ' + token);
                // btoa('username:password'));
        }
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}