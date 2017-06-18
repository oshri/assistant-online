import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { MaterialModule, MdIconRegistry } from '@angular/material';

export * from './loading.service';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [LoadingComponent],
  providers: [LoadingService, MdIconRegistry]
})
export class LoadingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoadingModule,
      providers: [LoadingService]
    };
  }
}