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
import { SheardComponentsModule } from './../sheardComponents/sheardComponents.module';


// Components
import { ProjectsComponent } from './components/projects/projects.component';
import { NewProjectForm } from './components/newProjectForm/newProjectForm.component';
import { ProjectComponent } from './components/project/project.component'; 
import { DocumentBoxComponent } from '../sheardComponents/components/documentBox/documentBox.component';
import { NewPageForm } from './components/newPageForm/newPageForm.component';

// Services
import { ProjectsService } from './services/projects.service';
import { ProjectsResolver } from './services/projects.resolve';
import { Store } from './../../services/store/store';



@NgModule({
  declarations: [
    ProjectsComponent,
    NewProjectForm,
    ProjectComponent,
    NewPageForm
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
    MdProgressSpinnerModule,
    SheardComponentsModule
  ],
  providers: [
    ProjectsService,
    ProjectsResolver
  ],
  entryComponents: [],
  bootstrap: []
})

export class ProjectsModule { }