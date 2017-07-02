import {    ChangeDetectionStrategy,
            Component,
            EventEmitter,
            Input,
            Output,
            ViewChild,
            Inject } from '@angular/core';
import { ProjectsService } from './../../services/projects.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
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
        @Inject(MD_DIALOG_DATA) public data: any)
    {
        this.form = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required, ProjectValidators.matchName(data.name)]))
        });
    }

    onSubmit() {
        let val = this.form.value;
        val.creationTime = new Date();
        
        // this.projectSrv.addProject(this.newForm.value).subscribe(
        //     (project: iProject) => {
        //         this.toogleModalState();
        //         this.submiting = false;
        //         this.router.navigate(['/projects', project._id]);
        //     },
        //     (error) => {
        //         this.submiting = false;
        //         this.toogleModalState();
        //         this.showNotify(error, 'NEWPROJECT');
        //     }
        // );
    }

}