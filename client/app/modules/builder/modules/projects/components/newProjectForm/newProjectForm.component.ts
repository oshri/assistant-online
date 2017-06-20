import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';


@Component({
    selector: 'new-project-form',
    styleUrls: ['newProjectForm.component.scss'],
    templateUrl: 'newProjectForm.component.html'
})

export class NewProjectForm implements OnInit {

    newForm: FormGroup

    constractor(){
        this.newForm = new FormGroup({
            name: new FormControl(''),
            description: new FormControl(''),
            framework: new FormGroup({}),
            components: new FormGroup({})
        });
    }

    ngOnInit(){

    }
}