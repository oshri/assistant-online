import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iProject } from './../../models/project.interface';
import { Store } from './../../../../services/store/store';

@Component({
    selector: 'projects',
    styleUrls: ['projects.component.scss'],
    templateUrl: 'projects.component.html'
})
export class ProjectsComponent implements OnInit {
    data: Observable<{projects: iProject[]}> = this.route.data;
    projects: iProject[];

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private snackbar: MdSnackBar
    ){}

    ngOnInit(){
        this.store.set('appHeaderTitle', '/projects');
        this.data.subscribe((data: any) => {
          this.projects = data.projects;
        });
    }

    onChanges(event){
        console.log(event);
    }

    onRemove(event){
        this.projects = this.projects.filter((project: any) => {
            return project._id !== event._id;
        });
        this.showNotify(`The ${event.name} success deleted.`, 'DELETE');
    }

    showNotify(message: string, action: string): void {
        this.snackbar.open(message, action, {
            duration: 3000
        });
    }
}