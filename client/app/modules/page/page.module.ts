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
import { PageRouterModule } from './page.routes';
import { SheardComponentsModule } from './../sheardComponents/sheardComponents.module';


// Components
import { PageComponent } from './components/page/page.component';

// Services
import { PageService } from './services/page.service';
import { PageResolver } from './services/page.resolve';



@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PageRouterModule,
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule,
    MdIconModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    SheardComponentsModule
  ],
  providers: [
    PageService,
    PageResolver
  ],
  entryComponents: [],
  bootstrap: []
})

export class PageModule { }