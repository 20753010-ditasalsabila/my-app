import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../interface/employee';

const FIRSTNAME: string[] = ['Micky', 'Kyle', 'Pou', 'Isabel', 'Sabila', 'Andara', 'Olaf', 'Elsa'];
const LASTNAME: string[] = ['Juan', 'Jake', 'Sin', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore'];

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group',
    'description',
    'actions',
  ];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): Employee {
  const name =
    FIRSTNAME[Math.round(Math.random() * (FIRSTNAME.length - 1))] +
    LASTNAME[Math.round(Math.random() * (LASTNAME.length - 1))].charAt(0);

  const randomDays = Math.floor(Math.random() * 365) - 365;
  const setRandom = new Date().setDate(new Date().getDate() + randomDays);
  const date = new Date(setRandom);

  const min = 5000000;
  const max = 50000000;

  return {
    id: id,
    username: name,
    firstName: FIRSTNAME[Math.round(Math.random() * (FIRSTNAME.length - 1))],
    lastName: LASTNAME[Math.round(Math.random() * (LASTNAME.length - 1))],
    email: (FIRSTNAME[Math.round(Math.random() * (FIRSTNAME.length - 1))] + '@gmail.com').toLowerCase(),
    birthDate: date,
    basicSalary: Math.floor(Math.random() * (max - min + 1)) + min,
    status: FIRSTNAME[Math.round(Math.random() * (FIRSTNAME.length - 1))],
    group: FIRSTNAME[Math.round(Math.random() * (FIRSTNAME.length - 1))],
    description: date,
  };
}
