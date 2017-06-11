import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    styleUrls: ['home.component.scss'],
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(
        public auth: AuthService
    ){}

    ngOnInit(){

    }

}