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
    remove: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        public dialog: MdDialog
    ){}

    ngOnInit(){

    }

    deleteProject() {
        let dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
            width: '400px',
            height: '400px',
            data: this.data
        });
        dialogRef.afterClosed().subscribe(result => {
        console.log('after closed', result);
        });
    };
}