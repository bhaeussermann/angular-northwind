import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
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
    ]),
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
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
