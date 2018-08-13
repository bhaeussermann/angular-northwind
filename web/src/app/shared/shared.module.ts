import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader.component';
import { SortController } from './sort-controller';
import { DEFAULT_TIMEOUT, defaultTimeout, TimeoutInterceptor } from './timeout-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [
    SortController,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: defaultTimeout }]
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    LoaderComponent
  ]
})
export class SharedModule { }
