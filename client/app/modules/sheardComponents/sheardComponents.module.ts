import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MaterialModule,
          MdIconRegistry,
          MdMenuModule,
          MdDialogModule,
          MdIconModule,
          MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';


// Components
import { DocumentBoxComponent } from './components/documentBox/documentBox.component';
import { DeleteDocumentDialogComponent } from './components/deleteDocumentDialog/deleteDocumentDialog.component';

@NgModule({
  declarations: [
    DocumentBoxComponent,
    DeleteDocumentDialogComponent
  ],
  exports: [
    DocumentBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule,
    MdIconModule,
    MdButtonModule,
    RouterModule
  ],
  providers: [
    MdIconRegistry,
  ],
  entryComponents: [
    DeleteDocumentDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SheardComponentsModule { }
