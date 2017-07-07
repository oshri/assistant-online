import {    ChangeDetectionStrategy,
            Component,
            EventEmitter,
            Input,
            Output,
            ViewChild,
            Inject } from '@angular/core';
import { ProjectsService } from './../../services/projects.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { ProjectValidators } from '../../validators/project.validator';

@Component({
  selector: 'delete-project-dialog',
  styleUrls: ['deleteProjectDialog.component.scss'],
  templateUrl: 'deleteProjectDialog.component.html'
})

export class DeleteProjectDialogComponent {
  form: FormGroup;

    constructor(
        public projectsSrv: ProjectsService,
        public dialogRef: MdDialogRef<DeleteProjectDialogComponent>,
        private snackbar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) public data: any)
    {
        this.form = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required, ProjectValidators.matchName(data.name)]))
        });
    }

    onSubmit() {
        let val = this.form.value;
        val.creationTime = new Date();
        
        this.projectsSrv.deleteProject(this.data._id).subscribe(
            (res: any) => {
                this.dialogRef.close('delete');
            },
            (error) => {
                this.showNotify(error, 'DELETE');
            }
        );
    }

    showNotify(message: string, action: string): void {
        this.snackbar.open(message, action, {
            duration: 3000
        });
    }

}