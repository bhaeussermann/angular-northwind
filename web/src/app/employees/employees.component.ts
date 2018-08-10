import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { SortController, SortOrder } from '../shared/sort-controller';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  private _sortController: SortController;

  constructor(private _employeeService: EmployeeService) {
    this._sortController = new SortController();
  }

  ngOnInit() {
    this._employeeService.getEmployees()
      .subscribe(e => this.employees = e);
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
