import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    animations: [
        trigger('loadingState', [
            state( 'inactive', style({
                opacity: 0,
                display: 'none'
            })),
            state('active',   style({
                opacity: 1,
            })),
            transition('active => inactive', animate('200ms ease-out')),
            transition('inactive => active', animate('0ms ease-in'))
        ])
    ]
})
export class LoadingComponent implements OnInit {

    loadingState: string = 'inactive';

    constructor(
        private _loadingSvc: LoadingService,
        private iconRegistry: MdIconRegistry,
        private sanitizer: DomSanitizer) {
        this.iconRegistry.addSvgIcon(
            'quicApp',
            this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/quicApp-icon.svg'));

    }

    ngOnInit(): void {
        this._loadingSvc.getValue().subscribe( (status: boolean) => {
            this.loadingState = status ? 'active' : 'inactive';
        });
    }
}