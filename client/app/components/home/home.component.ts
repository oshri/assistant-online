import { Store } from './../../services/store/store';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    styleUrls: ['home.component.scss'],
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(
        private store: Store
    ){}

    ngOnInit(){

    }


}