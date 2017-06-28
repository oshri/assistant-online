import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {
  constructor(private http: Http) { }

  getProjects(): Observable<any> {
    return this.http.get('/api/projects').map(res => res.json());
  }

  addProject(project): Observable<any> {
    return this.http.post('/api/projects', JSON.stringify(project));
  }

  getProject(project): Observable<any> {
    return this.http.get(`/api/projects/${project._id}`).map(res => res.json());
  }

  editProjects(project): Observable<any> {
    return this.http.put(`/api/projects/${project._id}`, JSON.stringify(project));
  }

  deleteProject(project): Observable<any> {
    return this.http.delete(`/api/projects/${project._id}`);
  }

}
