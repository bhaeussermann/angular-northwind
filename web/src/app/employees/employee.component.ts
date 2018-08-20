import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  private isLoading: boolean;
  private didLoad: boolean;
  private isSaving: boolean;
  private errorMessage: string;
  private employee: Employee;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _employeeService: EmployeeService
  ) { }

  get hasError(): boolean {
    return this.errorMessage != null;
  }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');

    this.isLoading = true;
    this._employeeService.getEmployee(id).subscribe(
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

  onBack(): void {
    this.navigateBack();
  }

  cancel(): void {
    this.navigateBack();
  }

  save(): void {
    this.errorMessage = null;
    this.isSaving = true;

    this._employeeService.updateEmployee(this.employee).subscribe(
      v => {
        this.navigateBack();
      },
      error => {
        this.errorMessage = 'Error saving employee: ' + error;
        this.isSaving = false;
      }
    );
  }

  private navigateBack() {
    this._router.navigate(['/employees']);
  }
}
