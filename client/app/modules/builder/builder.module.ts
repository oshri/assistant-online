import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

//Modules
import { BuilderRouterModule } from './builder.routes';

// Components
import { BuilderComponent } from './components/builder/builder.component';

// Services



@NgModule({
  declarations: [
    BuilderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BuilderRouterModule
  ],
  providers: [],
  bootstrap: []
})

export class BuilderModule { }