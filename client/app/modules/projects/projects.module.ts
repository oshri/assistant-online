import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {  MaterialModule,
          MdIconRegistry,
          MdMenuModule,
          MdDialogModule,
          MdIconModule,
          MdButtonModule,
          MdProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

//Modules
import { ProjectsRouterModule } from './projects.routes';

// Components
import { ProjectsComponent } from './components/projects/projects.component';
import { NewProjectForm } from './components/newProjectForm/newProjectForm.component';

// Services

@NgModule({
  declarations: [
    ProjectsComponent,
    NewProjectForm
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProjectsRouterModule,
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule,
    MdIconModule,
    MdButtonModule,
    MdProgressSpinnerModule
  ],
  providers: [],
  bootstrap: []
})

export class ProjectsModule { }