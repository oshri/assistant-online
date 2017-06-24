import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

interface iFramework {
    id: number,
    name: string
}

interface iUilibrary {
    id: number,
    name: string
}


@Component({
    selector: 'new-project-form',
    styleUrls: ['newProjectForm.component.scss'],
    templateUrl: 'newProjectForm.component.html',
    animations: [
        // trigger('animateCircle', [
        //     transition('0 => 1', [
        //         query('.circle-parts', [
        //             stagger(0, [
        //                 animate('200ms cubic-bezier(.35,0,.25,1)', style({opacity: 0}))
        //             ])
        //         ])
        //     ]),
        //     transition('1 => 0', [
        //         query('.circle-parts', [
        //             stagger(0, [
        //                 animate('300ms cubic-bezier(.35,0,.25,1)', style({opacity: 1}))
        //             ])
        //         ])
        //     ])
        // ])
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

export class NewProjectForm implements OnInit {
    isVisible : boolean = false;
    submiting: boolean = false;
    newForm: FormGroup;
    frameworks: iFramework[] = [{id: 1, name: 'Angular'}];
    uilibrarys: iUilibrary[] = [{id: 1, name: 'Material Design'}];

    constractor(){
        
    }

    ngOnInit(){
        this.newForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            framework: new FormControl('', [Validators.required]),
            library: new FormControl('', [Validators.required])
        });

        console.log(this.newForm)
    }

    toogleModalState(){
        this.isVisible = !this.isVisible;
    }

    onSubmit(){
        console.log(this.newForm.value);
        this.submiting = true;
        this.toogleModalState();

        // TODO add call to service and update ui on response status
        setTimeout(() => {
            this.submiting = false;
        }, 800);
    }

    onReset(){
        this.newForm.reset();
        this.isVisible = !this.isVisible;
    }

}