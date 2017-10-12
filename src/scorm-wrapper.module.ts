import { NgModule } from '@angular/core';
import { ScormWrapperService } from './services';
import { WindowRef } from './services/window-ref';

@NgModule({
  providers: [
    ScormWrapperService,
    WindowRef
  ],
  exports: [
  ]
})
export class ScormWrapperModule {
}
