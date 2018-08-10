import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { SortController, SortOrder } from '../shared/sort-controller';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  employees: Employee[] = null;
  private _sortController: SortController;

  constructor(private _employeeService: EmployeeService) {
    this._sortController = new SortController();
  }

  get hasError(): boolean {
    return this.errorMessage != null;
  }

  get didLoad(): boolean {
    return this.employees != null;
  }

  ngOnInit() {
    this.isLoading = true;

    this._employeeService.getEmployees()
      .subscribe(
        e => {
          this.isLoading = false;
          this.errorMessage = null;
          this.employees = e;
          this._sortController.setSortField('lastName');
          this._sortController.sort(this.employees);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error;
          this.employees = null;
        }
      );
  }

  toggleSortField(fieldName: string) {
    this._sortController.toggleSortField(fieldName);
    this._sortController.sort(this.employees);
  }

  sortIndicatorClass(fieldName: string): string {
    if (this._sortController.currentSortField === fieldName)
      return this._sortController.sortOrder === SortOrder.Ascending ? "sort-arrow up" : "sort-arrow down";
    
    return '';
  }
}
