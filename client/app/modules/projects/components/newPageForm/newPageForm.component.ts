import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MdSnackBar } from '@angular/material';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { iPage } from './../../models/page.interface';

interface iLayout {
    id: number,
    name: string
}

@Component({
    selector: 'new-page-form',
    styleUrls: ['newPageForm.component.scss'],
    templateUrl: 'newPageForm.component.html',
    animations: [
        trigger('animateCircle', [
            state('false', style({
                opacity: 0
            })),
            state('true', style({
                opacity: 1
            })),
            transition('false <=> true', animate('250ms ease-in'))
        ])
    ]
})

export class NewPageForm implements OnInit {
    isVisible: boolean = false;
    submiting: boolean = false;
    newForm: FormGroup;
    layouts: iLayout[] = [{ id: 1, name: 'blank' }];
    
    @Input()
    projectId: string;

    constructor(
        private projectSrv: ProjectsService,
        private snackbar: MdSnackBar,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.newForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            layout: new FormControl('', [Validators.required])
        });
    }

    showNotify(message: string, action: string): void {
        this.snackbar.open(message, action, {
            duration: 3000
        });
    }


    toogleModalState() {
        this.isVisible = !this.isVisible;
    }

    onSubmit() {
        let val = this.newForm.value;
        val.creationTime = new Date();
        this.submiting = true;
        this.projectSrv.addPage(this.newForm.value, this.projectId).subscribe(
            (page: iPage) => {
                this.toogleModalState();
                this.submiting = false;
                this.router.navigate(['/page', page._id]);
            },
            (error) => {
                this.submiting = false;
                this.toogleModalState();
                this.showNotify(error, 'NEWPAGE');
            }
        );
    }


    onReset() {
        this.newForm.reset();
        this.isVisible = !this.isVisible;
    }

}