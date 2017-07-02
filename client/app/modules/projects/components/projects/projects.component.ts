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

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ){}

    ngOnInit(){
        this.store.set('appHeaderTitle', '/projects');
    }

    onChanges(event){
        console.log(event);
    }

    onRemove(event){
        console.log(event);
    }
}