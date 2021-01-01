import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog.component';

@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  errorIcon = faExclamationCircle;
  isLoading: boolean;
  errorMessage: string;
  filteredEmployees: Employee[];
  ColumnMode = ColumnMode;

  isDeletingEmployee: boolean;
  deletedEmployeeId: number;
  deleteEmployeeError: string;

  private _allEmployees: Employee[] = null;
  private _filter: string;
  
  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService
    )
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
    this.load();
  }

  addEmployee() {
    this._dialog.open(EmployeeComponent)
      .afterClosed().subscribe(result => {
        if (result === 'saved')
          this.load();
      });
  }

  editEmployee(employeeId: number) {
    this._dialog.open(EmployeeComponent, { data: employeeId })
      .afterClosed().subscribe(result => {
        if (result === 'saved')
          this.load();
      });
  }

  confirmDelete(id: number, name: string) {
    this._dialog.open(ConfirmationDialogComponent, { data: `Delete ${name}?` })
      .afterClosed().subscribe(result => {
        if (result === 'yes') {
          this.deleteEmployeeError = null;
          this.deletedEmployeeId = id;
          this.isDeletingEmployee = true;
          this._employeeService.deleteEmployee(id)
            .subscribe(
              v => {
                this.isDeletingEmployee = false;
                this.deletedEmployeeId = null;
                this.load();
              },
              error => {
                this.isDeletingEmployee = false;
                this.deleteEmployeeError = error;
              }
            );
        }
      });
  }

  private load() {
    this.isLoading = true;

    this._employeeService.getEmployees()
      .subscribe(
        e => {
          this.isLoading = false;
          this.errorMessage = null;
          this.deletedEmployeeId = null;
          this._allEmployees = e;

          this.refreshFilteredEmployees();
        },
        error => {
          this.isLoading = false;
          this.errorMessage = error;
          this.deletedEmployeeId = null;
          this._allEmployees = null;
          this.filteredEmployees = null;
        }
      );
  }

  private refreshFilteredEmployees() {
    this.filteredEmployees = !this._filter
      ? this._allEmployees.slice()
      : this._allEmployees.filter(e => this.employeeDoesMatchFilter(e));
  }

  private employeeDoesMatchFilter(employee: Employee): boolean {
    for (var property in employee) {
      if ((employee.hasOwnProperty(property)) && (String(employee[property]).toLowerCase().indexOf(this._filter.toLowerCase()) != -1))
        return true;
    }
    return false;
  }
}
