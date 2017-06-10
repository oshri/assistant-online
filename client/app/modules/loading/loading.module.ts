import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

export * from './loading.service';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [CommonModule],
  exports: [LoadingComponent],
  providers: [LoadingService]
})
export class LoadingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoadingModule,
      providers: [LoadingService]
    };
  }
}