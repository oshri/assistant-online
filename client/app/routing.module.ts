import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '',
    component: HomeComponent 
  },{ 
    path: 'login',
    component: HomeComponent 
  },{
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    // canActivate: [AuthGuardLogin]
  },{
    path: 'projects',
    loadChildren: './modules/projects/projects.module#ProjectsModule'
    // canActivate: [AuthGuardLogin]
  }
  // { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
