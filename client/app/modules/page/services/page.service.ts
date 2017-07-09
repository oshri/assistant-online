import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { iPage } from '../models/page.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PageService {
  constructor(private http: Http) { }

  getPage(id): Observable<any> {
    return this.http.get(`/api/page/${id}`).map(res => res.json());
  }

  editPage(page: iPage): Observable<any> {
    return this.http.put(`/api/projepagects/${page._id}`, JSON.stringify(page));
  }

  deletePage(id): Observable<any> {
    return this.http.delete(`/api/pages/${id}`);
  }
  
}
