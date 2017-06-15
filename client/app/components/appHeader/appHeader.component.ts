import { AuthService } from './../../services/auth.service';
import { Store } from './../../services/store/store';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector:'app-header',
    styleUrls: ['appHeader.component.scss'],
    templateUrl: 'appHeader.component.html',
    animations: [
        trigger('myAwesomeAnimation', [
            state('small', style({
                backgroundColor: '#F8F8F8'
            })),
            state('large', style({
                backgroundColor: '#1d1c1a'
            })),
            transition('small <=> large', animate('250ms ease-in'))
        ])
    ]
})

export class AppHeaderComponent implements OnInit,OnDestroy {

    headerState$ = this.store.select('loggedinStatus');
    headerSubscription: Subscription;

    @Input()
    authenticated: boolean;

    public authState: string = 'small';

    constructor(
        public auth: AuthService,
        private store: Store)
    {
        
    }

    ngOnInit(){
        // this.authState = this.updateHeaderState(this.auth.isAuthenticated());
        // debugger

        this.headerSubscription = this.headerState$.subscribe((state: boolean) => {
            this.authState = this.updateHeaderState(state);
        });
    }

    ngOnDestroy(){
        this.headerSubscription.unsubscribe()
    }

    updateHeaderState(state: boolean) :string{
        return state ? 'large' : 'small';
    }

}