import { Component, Inject } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  isLoading: boolean;
  didLoad: boolean;
  isSaving: boolean;
  didSave: boolean;
  isAdding: boolean;
  didSubmit: boolean = false;
  errorMessage: string;
  employee: Employee;
  
  constructor(
    private _dialog: MatDialogRef<EmployeeComponent>,
    private _employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) employeeId?: number
  ) {
    this.employee = new Employee();
    this.isAdding = employeeId == null;

    if (this.isAdding)
      this.didLoad = true;
    else
      this.loadEmployee(employeeId);
  }

  get hasError(): boolean {
    return this.errorMessage != null;
  }

  cancel(): void {
    this._dialog.close('canceled');
  }

  setDidSubmit(): void {
    this.didSubmit = true;
  }

  save(): void {
    this.errorMessage = null;
    this.isSaving = true;

    if (this.isAdding) {
      this._employeeService.addEmployee(this.employee).subscribe(
        id => {
          this.didSave = true;
          this._dialog.close('saved');
        },
        error => {
          this.errorMessage = 'Error saving employee: ' + error;
          this.isSaving = false;
        }
      );
    }
    else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        v => {
          this.didSave = true;
          this._dialog.close('saved');
        },
        error => {
          this.errorMessage = 'Error saving employee: ' + error;
          this.isSaving = false;
        }
      );
    }
  }

  private loadEmployee(employeeId: number) {
    this.isLoading = true;
    this._employeeService.getEmployee(employeeId).subscribe(
      e => {
        this.employee = e;
        this.isLoading = false;
        this.didLoad = true;
      },
      error => {
        this.errorMessage = 'Error retrieving employee: ' + error;
        this.isLoading = false;
      });
  }
}
