import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './../../../loading/loading.service';
import { iPage } from './../../models/page.interface';
import { PageService } from './../../services/page.service';
import { Store } from './../../../../services/store/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page',
    styleUrls: ['page.component.scss'],
    templateUrl: 'page.component.html'
})

export class PageComponent implements OnInit {
    data: Observable<{page: iPage}> = this.route.data;
    page: iPage;

    constructor(
        private loading: LoadingService,
        private router: Router,
        private route: ActivatedRoute,
        private pageSrv: PageService,
        private store: Store,
        private snackbar: MdSnackBar
    ){

    }

    ngOnInit(){
        this.data.subscribe((data: any) => {
            this.page = data.page;
            this.store.set('appHeaderTitle', this.page.name);
        });
    }

    

    showNotify(message: string, action: string): void {
        this.snackbar.open(message, action, {
            duration: 3000
        });
    }

}