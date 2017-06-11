import { AuthService } from './../../services/auth.service';
import { Component, Input } from '@angular/core';

@Component({
    selector:'app-header',
    styleUrls: ['appHeader.component.scss'],
    templateUrl: 'appHeader.component.html'
})

export class AppHeaderComponent {

    @Input()
    authenticated: boolean;

    constructor(
        public auth: AuthService)
    {

    }
}