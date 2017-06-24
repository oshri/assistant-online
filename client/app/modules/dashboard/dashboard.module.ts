import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

//Modules
import { DashboardRouterModule } from './dashboard.routes';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Services



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DashboardRouterModule
  ],
  providers: [],
  bootstrap: []
})

export class DashboardModule { }