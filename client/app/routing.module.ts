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
    path: 'builder',
    loadChildren: './modules/builder/builder.module#BuilderModule'
  }
  // { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
