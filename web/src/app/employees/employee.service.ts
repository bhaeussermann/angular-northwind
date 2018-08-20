import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class EmployeeService {
  private _employeeUrl = './api/employees';

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this._employeeUrl,
      { headers: new HttpHeaders({ timeout: `${5000}`}) })
      .catch(this.handleError);
  }

  getEmployee(id: number): Observable<Employee> {
    return this._http.get(this._employeeUrl + '/' + id,
      { headers: new HttpHeaders({ timeout: `${5000}`}) })
      .map(response => {
        let e: any = response;
        return new Employee(e.id, e.firstName, e.lastName, e.title, new Date(e.birthDate));
      })
      .catch(this.handleError);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this._http.put(this._employeeUrl + '/' + employee.id, employee,
      { headers: new HttpHeaders({ timeout: `${5000}`}) })
      .map(response => {
        return;
      })
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
      console.error(error.message);
      return Observable.throw(error.message);
  }
}
