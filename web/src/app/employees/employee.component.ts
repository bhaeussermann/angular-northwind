import { Component } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    private _activeModal: NgbActiveModal,
    private _employeeService: EmployeeService
  ) {
    this.employee = new Employee();
    this.didLoad = true;
    this.isAdding = true; 
  }

  get hasError(): boolean {
    return this.errorMessage != null;
  }

  initForEmployee(employeeId: number) {
    this.isAdding = false;
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

  cancel(): void {
    this._activeModal.close('canceled');
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
          this._activeModal.close('saved');
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
          this._activeModal.close('saved');
        },
        error => {
          this.errorMessage = 'Error saving employee: ' + error;
          this.isSaving = false;
        }
      );
    }
  }
}
