import { Component } from '@angular/core';
import { Employee } from '../interface/employee';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
  employeeList: Employee[] = [];
  
  constructor() {
    console.log(this.employeeList);
    
  }
  
}
