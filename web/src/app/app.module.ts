import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeService } from './employees/employee.service';
import { TimeoutInterceptor, DEFAULT_TIMEOUT, defaultTimeout } from './shared/timeout-interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { SortController } from './shared/sort-controller';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'employees', component: EmployeesComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: '**', redirectTo: 'employees', pathMatch: 'full' }
    ])
  ],
  providers: [
    EmployeeService,
    SortController,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: defaultTimeout }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
