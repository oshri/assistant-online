import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { iProject } from '../models/project.interface';
import { iPage } from '../models/page.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {
  constructor(private http: Http) { }

  getProjects(): Observable<any> {
    return this.http.get('/api/projects').map(res => res.json());
  }

  addProject(project: iProject): Observable<any> {
    return this.http.post('/api/projects', JSON.stringify(project)).map(res => res.json());
  }

  getProject(id): Observable<any> {
    return this.http.get(`/api/projects/${id}`).map(res => res.json());
  }


  editProjects(project): Observable<any> {
    return this.http.put(`/api/projects/${project._id}`, JSON.stringify(project));
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(`/api/projects/${id}`);
  }
  
  // pages
  getPages(id): Observable<any> {
    return this.http.get(`/api/pages/${id}`).map(res => res.json());
  }

  deletePage(id): Observable<any> {
    return this.http.delete(`/api/pages/${id}`);
  }

  addPage(page: iPage, project_id: string): Observable<any> {
    return this.http.post(`/api/pages/${project_id}`, JSON.stringify(page)).map(res => res.json());
  }

}
