import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from './employee.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: 'employees', component: EmployeeListComponent }
    ])
  ],
  declarations: [
    EmployeeListComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
