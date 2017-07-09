import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from './components/page/page.component';
import { PageResolver } from './services/page.resolve';



const PAGE_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'page?param=true',
        
    },
    {
        path: ':id',
        component: PageComponent,
        resolve: {
            page: PageResolver
        }
    }
];

export let PageRouterModule = RouterModule.forChild(PAGE_ROUTES);