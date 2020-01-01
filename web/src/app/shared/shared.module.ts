import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader.component';
import { SortController } from './sort-controller';
import { defaultTimeout, DEFAULT_TIMEOUT, TimeoutInterceptor } from './timeout-interceptor';
import { InlineLoaderComponent } from './inline-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    LoaderComponent,
    InlineLoaderComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    SortController,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: defaultTimeout }]
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoaderComponent,
    InlineLoaderComponent,
    FontAwesomeModule
  ]
})
export class SharedModule { }
