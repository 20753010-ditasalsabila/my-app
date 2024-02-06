import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EmployeeComponent } from './pages/employee/employee-list/employee.component';
import { EmployeeFormComponent } from './pages/employee/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './pages/employee/employee-detail/employee-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
      },
      {
        path: 'employee',
        data: { title: 'List Employee' },
        component: EmployeeComponent,
      },
      {
        path: 'employee/add',
        data: { title: 'Add Employee' },
        component: EmployeeFormComponent,
      },
      {
        path: 'employee/edit/:id',
        data: { title: 'Edit Employee' },
        component: EmployeeFormComponent,
      },{
        path: 'employee/detail/:id',
        data: { title: 'Detail Employee' },
        component: EmployeeDetailComponent,
      },
];
