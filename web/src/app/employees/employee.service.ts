import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {
  private _employeeUrl = 'http://localhost:4200/api/employees';

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this._employeeUrl)
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
      console.error(error.message);
      return Observable.throw(error.message);
  }
}
