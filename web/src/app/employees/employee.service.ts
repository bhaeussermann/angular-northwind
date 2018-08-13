import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
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

  private handleError(error: HttpErrorResponse) {
      console.error(error.message);
      return Observable.throw(error.message);
  }
}
