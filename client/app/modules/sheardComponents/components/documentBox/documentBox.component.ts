import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DeleteDocumentDialogComponent } from '../deleteDocumentDialog/deleteDocumentDialog.component';
import { Router } from '@angular/router';

export interface iDocument{

}

@Component({
    selector: 'document-box',
    styleUrls: ['documentBox.component.scss'],
    templateUrl: 'documentBox.component.html'
})
export class DocumentBoxComponent implements OnInit{
    @Input()
    data: iDocument

    @Output()
    change: EventEmitter<any> =  new EventEmitter<any>();

    @Output()
    remove: EventEmitter<iDocument> = new EventEmitter<iDocument>();

    constructor(
        public dialog: MdDialog,
        private router: Router
    ){}

    ngOnInit(){

    }

    goTo(path:string, params:string){
        this.router.navigate([path, params]);
    }

    deleteDocument() {
        let dialogRef = this.dialog.open(DeleteDocumentDialogComponent, {
            width: '520px',
            height: 'auto',
            data: this.data
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result.action === 'delete'){
                this.remove.emit(this.data);
            }
        });
    };
}