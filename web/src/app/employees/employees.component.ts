import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor() { }

  ngOnInit() {
    this.employees = [
      new Employee('Bernhard', 'Häussermann', 'Mr'),
      new Employee('Deon', 'Coetzee', 'Mr')
    ];
  }
}
