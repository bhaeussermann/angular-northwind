import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isLoading: boolean;
  didLoad: boolean;
  isSaving: boolean;
  didSave: boolean;
  isAdding: boolean;
  didSubmit: boolean = false;
  errorMessage: string;
  employee: Employee;
  
  constructor(
    private _modalService: BsModalService,
    private _modalReference: BsModalRef,
    private _employeeService: EmployeeService
  ) { }

  get hasError(): boolean {
    return this.errorMessage != null;
  }

  ngOnInit() {
      this.employee = new Employee();
      this.didLoad = true;
      this.isAdding = true;

      let onShownSubscription: Subscription = null;
      onShownSubscription = this._modalService.onShown.subscribe(_ => {
        (document.querySelector('[autofocus]') as HTMLElement).focus();
        onShownSubscription.unsubscribe();
      });
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
    this._modalReference.hide();
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
          this._modalReference.hide();
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
          this._modalReference.hide();
        },
        error => {
          this.errorMessage = 'Error saving employee: ' + error;
          this.isSaving = false;
        }
      );
    }
  }
}
