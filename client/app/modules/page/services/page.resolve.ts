import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { iPage } from '../models/page.interface';
import { PageService } from './page.service';

@Injectable()
export class PageResolver implements Resolve<iPage> {
    constructor(private pageSrv: PageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.pageSrv.getPage(route.params.id);
    }
}