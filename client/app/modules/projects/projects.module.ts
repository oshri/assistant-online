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
import { ProjectBoxComponent } from './components/projectBox/projectBox.component';
import { ProjectComponent } from './components/project/project.component'; 
import { DeleteProjectDialogComponent } from './components/deleteProjectDialog/deleteProjectDialog.component';

// Services
import { ProjectsService } from './services/projects.service';
import { ProjectsResolver } from './services/projects.resolve';
import { Store } from './../../services/store/store';



@NgModule({
  declarations: [
    ProjectsComponent,
    NewProjectForm,
    ProjectBoxComponent,
    ProjectComponent,
    DeleteProjectDialogComponent
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
  providers: [
    ProjectsService,
    ProjectsResolver
  ],
  entryComponents: [
    DeleteProjectDialogComponent
  ],
  bootstrap: []
})

export class ProjectsModule { }