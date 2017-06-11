import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

//Modules
import { ProjectsRouterModule } from './projects.routes';

// Components
import { ProjectsComponent } from './components/projects/projects.component';

// Services



@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProjectsRouterModule
  ],
  providers: [],
  bootstrap: []
})

export class ProjectsModule { }