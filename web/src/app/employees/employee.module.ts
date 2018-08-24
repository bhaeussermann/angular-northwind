import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from './employee.service';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeGuardService } from './employee-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/new', component: EmployeeComponent },
      { path: 'employees/:id', canActivate: [ EmployeeGuardService ], component: EmployeeComponent }
    ])
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeComponent
  ],
  providers: [
    EmployeeService,
    EmployeeGuardService
  ]
})
export class EmployeeModule { }
