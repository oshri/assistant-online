import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { iProject } from './../../models/project.interface';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DeleteProjectDialogComponent } from './../deleteProjectDialog/deleteProjectDialog.component';


@Component({
    selector: 'project-box',
    styleUrls: ['projectBox.component.scss'],
    templateUrl: 'projectBox.component.html'
})
export class ProjectBoxComponent implements OnInit{
    @Input()
    data: iProject

    @Output()
    change: EventEmitter<any> =  new EventEmitter<any>();

    @Output()
    remove: EventEmitter<iProject> = new EventEmitter<iProject>();

    constructor(
        public dialog: MdDialog
    ){}

    ngOnInit(){

    }

    deleteProject() {
        let dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
            width: '520px',
            height: 'auto',
            data: this.data
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result === 'delete'){
                this.remove.emit(this.data);
            }
        });
    };
}