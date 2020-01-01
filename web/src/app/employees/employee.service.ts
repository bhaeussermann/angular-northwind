import { throwError as observableThrowError, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Injectable()
export class EmployeeService {
  private _employeeUrl = './api/employees';

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this._employeeUrl,
      { headers: new HttpHeaders({ timeout: `${5000}`}) }).pipe(
      catchError(this.handleError));
  }

  getEmployee(id: number): Observable<Employee> {
    return this._http.get(this._employeeUrl + '/' + id,
      { headers: new HttpHeaders({ timeout: `${5000}`}) }).pipe(
      map(response => {
        let e: any = response;
        return new Employee(e.id, e.firstName, e.lastName, e.title, new Date(e.birthDate));
      }),
      catchError(this.handleError),);
  }

  addEmployee(employee: Employee): Observable<number> {
    return this._http.post<number>(this._employeeUrl, employee,
      { headers: new HttpHeaders({ timeout: `${5000}`}) }).pipe(
      catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this._http.put(this._employeeUrl + '/' + employee.id, employee,
      { headers: new HttpHeaders({ timeout: `${5000}`}) }).pipe(
      map(_ => {
        return;
      }),
      catchError(this.handleError),);
  }

  deleteEmployee(id: number): Observable<void> {
    return this._http.delete(this._employeeUrl + '/' + id,
    { headers: new HttpHeaders({ timeout: `${5000}`}) }).pipe(
    map(_ => {
      return;
    }),
    catchError(this.handleError),);
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return observableThrowError(error.status === 500 ? JSON.parse(error.statusText).Message : error.message);
  }
}
