import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '../../services/store/store';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector:'app-header',
    styleUrls: ['appHeader.component.scss'],
    templateUrl: 'appHeader.component.html',
    animations: [
        trigger('authenticated', [
            state('not-authenticated', style({
                backgroundColor: '#F8F8F8'
            })),
            state('authenticated', style({
                backgroundColor: '#1d1c1a'
            })),
            transition('not-authenticated <=> authenticated', animate('250ms ease-in'))
        ])
    ]
})

export class AppHeaderComponent implements OnInit,OnDestroy {

    headerState$ = this.store.select('loggedinStatus');
    headerSubscription: Subscription;
    
    headerTitle$ = this.store.select('appHeaderTitle');
    headerTitleSubscription: Subscription;

    routerEvents: Subscription;

    @Input()
    authenticated: boolean;

    authState: string = 'not-authenticated';
    _stateName: string = '';


    constructor(
        public auth: AuthService,
        private store: Store,
        private router: Router)
    {
        
    }

    ngOnInit(){
        this.headerSubscription = this.headerState$.subscribe((state: boolean) => {
            this.authState = this.updateHeaderState(state);            
        });

        this.headerTitleSubscription = this.headerTitle$.subscribe((title: string) => {
            this._stateName = title;
        });

        // this.routerEvents = this.router.events.subscribe((state: any) => {
        //     this._stateName = state.url;
        // });
    }

    ngOnDestroy(){
        this.headerSubscription.unsubscribe();
        this.headerTitleSubscription.unsubscribe();
        this.routerEvents.unsubscribe();
    }

    get stateName(){
        return this._stateName;
    }

    updateHeaderState(state: boolean) :string{
        return state ? 'authenticated' : 'not-authenticated';
    }

}