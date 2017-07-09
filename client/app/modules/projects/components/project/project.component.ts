import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './../../../loading/loading.service';
import { iProject } from './../../models/project.interface';
import { iPage } from './../../models/page.interface';
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
    pages: iPage[]

    constructor(
        private loading: LoadingService,
        private router: Router,
        private route: ActivatedRoute,
        private projectsSrv: ProjectsService,
        private store: Store,
        private snackbar: MdSnackBar
    ){

    }

    ngOnInit(){
        this.route.params
            .switchMap((param: Params) => this.projectsSrv.getProject(param.id))
            .subscribe((project: iProject) => {
                this.store.set('appHeaderTitle', project.name);
                this.project = project;

                this.projectsSrv.getPages(this.project._id)
                    .subscribe((pages: iPage[]) => {
                        this.pages = pages;
                    });
            });
    }

    extendProject(page: iPage){
        return Object.assign(page, {type: '/page'});
    }

    onRemove(event){
        this.projectsSrv.deletePage(event._id).subscribe((res: any) => {
            this.pages = this.pages.filter((page: any) => {
                return page._id !== event._id;
            });
            this.showNotify(`The ${event.name} success deleted.`, 'DELETE');
        });
    }

    showNotify(message: string, action: string): void {
        this.snackbar.open(message, action, {
            duration: 3000
        });
    }

}