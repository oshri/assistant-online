import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DocValidators } from '../../validators/document/doc.validator';

@Component({
  selector: 'delete-document-dialog',
  styleUrls: ['deleteDocumentDialog.component.scss'],
  templateUrl: 'deleteDocumentDialog.component.html'
})

export class DeleteDocumentDialogComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MdDialogRef<DeleteDocumentDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any)
    {
        this.form = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required, DocValidators.matchName(data.name)]))
        });
    }

    onSubmit() {
        this.dialogRef.close({action: 'delete'});
    }

}