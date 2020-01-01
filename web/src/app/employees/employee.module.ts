import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: 'employees', component: EmployeeListComponent }
    ])
  ],
  entryComponents: [ 
    ConfirmationDialogComponent,
    EmployeeComponent 
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
