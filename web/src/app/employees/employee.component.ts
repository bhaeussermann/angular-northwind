import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public isLoading: boolean;
  public didLoad: boolean;
  public isSaving: boolean;
  public isAdding: boolean;
  public didSubmit: boolean = false;
  public errorMessage: string;
  public employee: Employee;
  
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
    this.isAdding = !id;

    if (this.isAdding) {
      this.employee = new Employee();
      this.didLoad = true;
    }
    else {
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
  }

  onBack(): void {
    this.navigateBack();
  }

  cancel(): void {
    this.navigateBack();
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
          this.navigateBack();
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
          this.navigateBack();
        },
        error => {
          this.errorMessage = 'Error saving employee: ' + error;
          this.isSaving = false;
        }
      );
    }
  }

  private navigateBack() {
    this._router.navigate(['/employees']);
  }
}
