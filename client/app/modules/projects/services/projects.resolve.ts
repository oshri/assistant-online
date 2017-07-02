import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { iProject } from '../models/project.interface';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProjectsResolver implements Resolve<iProject[]> {
    constructor(private projectSrv: ProjectsService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.projectSrv.getProjects();
    }
}