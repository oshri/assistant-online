import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './../../../loading/loading.service';
import { iProject } from './../../models/project.interface';
import { ProjectsService } from './../../services/projects.service';
import { Store } from './../../../../services/store/store';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'project',
    styleUrls: ['project.component.scss'],
    templateUrl: 'project.component.html'
})

export class ProjectComponent implements OnInit {
    project: iProject

    constructor(
        private loading: LoadingService,
        private router: Router,
        private route: ActivatedRoute,
        private projectsSrv: ProjectsService,
        private store: Store
    ){

    }

    ngOnInit(){
        this.route.params
            .switchMap((param: Params) => this.projectsSrv.getProject(param.id))
            .subscribe((project: iProject) => {
                this.store.set('appHeaderTitle', project.name);
                this.project = project;
            });
    }

}