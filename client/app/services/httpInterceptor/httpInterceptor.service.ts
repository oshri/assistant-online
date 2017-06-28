import { Injectable } from "@angular/core";
import { RequestOptions, ConnectionBackend, Response, Request, RequestOptionsArgs, Headers, Http } from "@angular/http";
import { Observable } from "rxjs";


@Injectable()
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

    // let token = localStorage.getItem('server_token');
    // let profile = localStorage.getItem('profile');

    // options = this.getRequestOptionArgs(options);
    // let json = { user_id: 'Empty' };
    // if (profile) {
    //   json = JSON.parse(profile);
    //   console.log('profile', json);
    // } else {
    //   console.log('no profile');
    // }
    // console.log('url', url);
    // // Make it work with the actual url
    // if (url.includes('local')){
    //   if (options) {
    //     options.headers.append('Authorization', `Bearer ${token}`);
    //     options.headers.append('user_id', json.user_id);
    //   } 
    // } else {
    //     console.log('not adding headers to other requests');
    // }

    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    let token = localStorage.getItem('server_token');
    let profile = localStorage.getItem('profile');
    if(token && profile){
      let user = JSON.parse(profile);
      options.headers.append('Authorization', `Bearer ${token}`);
      options.headers.append('user_id', user.user_id);
    }

    options.headers.append('Content-Type','application/json');
    options.headers.append('charset','UTF-8');
    return options;
  }

  private isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (this.isUnauthorized(err.status)) {
        if (err instanceof Response) {
          return Observable.throw(err.json().message || 'backend server error');
        }
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });
  }
}