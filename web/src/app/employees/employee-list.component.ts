import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { SortController, SortOrder } from '../shared/sort-controller';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  filteredEmployees: Employee[];
  private _allEmployees: Employee[] = null;
  private _filter: string;
  
  constructor(private _employeeService: EmployeeService, private _sortController: SortController) 
  {}

  get hasError(): boolean {
    return this.errorMessage != null;
  }

  get didLoad(): boolean {
    return this._allEmployees != null;
  }

  get filter(): string {
    return this._filter;
  }
  set filter(newFilter: string) {
    this._filter = newFilter;
    this.refreshFilteredEmployees();
  }

  ngOnInit() {
    this.isLoading = true;

    this._employeeService.getEmployees()
      .subscribe(
        e => {
          this.isLoading = false;
          this.errorMessage = null;
          this._allEmployees = e;
          this._sortController.setSortField('lastName');

          this.refreshFilteredEmployees();
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error;
          this._allEmployees = null;
          this.filteredEmployees = null;
        }
      );
  }

  toggleSortField(fieldName: string) {
    this._sortController.toggleSortField(fieldName);
    this._sortController.sort(this.filteredEmployees);
  }

  sortIndicatorClass(fieldName: string): string {
    if (this._sortController.currentSortField === fieldName)
      return this._sortController.sortOrder === SortOrder.Ascending ? 'sort-arrow up' : 'sort-arrow down';
    
    return '';
  }

  private refreshFilteredEmployees() {
    this.filteredEmployees = (!this._filter) || (this._filter == '')
      ? this._allEmployees
      : this._allEmployees.filter(e => this.employeeDoesMatchFilter(e));

    this._sortController.sort(this.filteredEmployees);
  }

  private employeeDoesMatchFilter(employee: Employee): boolean {
    for (var property in employee) {
      if ((employee.hasOwnProperty(property)) && (String(employee[property]).toLowerCase().indexOf(this._filter.toLowerCase()) != -1))
        return true;
    }
    return false;
  }
}
