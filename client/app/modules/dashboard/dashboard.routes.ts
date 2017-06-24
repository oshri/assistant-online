import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';

const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent
    }
];

export let DashboardRouterModule = RouterModule.forChild(DASHBOARD_ROUTES);