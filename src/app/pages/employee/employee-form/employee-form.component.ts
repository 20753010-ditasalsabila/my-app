import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { EMPTY, Observable, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee } from '../interface/employee';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeForm!: FormGroup;
  isEdit: Boolean = false;

  username = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  birthDate = new FormControl('', [Validators.required]);
  basicSalary = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  group = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  maxDate: Date;
  options: string[] = [
    'Harmonic Harmonizers',
    'Serendipity Squad',
    'Luminary Legends',
    'Ethereal Ensemble',
    'Nova Knights',
    'Radiant Rebels',
    'Celestial Circuits',
    'Spectrum Squad',
    'Zenith Zealots',
    'Infinity Alliance',
  ];
  filteredOptions!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.filteredOptions = this.group.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  resetForm() {
    console.log('reset', this.employeeForm);
    this.employeeForm.reset();
  }

  selectedEmployee: Employee = new Employee();

  add() {
    console.log(this.selectedEmployee.id);
    if (this.selectedEmployee.id === 0) {
      this.selectedEmployee.id = this.employeeList.length + 1;
      this.employeeList.push(this.selectedEmployee);
      
    }
    this.selectedEmployee = new Employee();
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.employeeList = this.employeeList.filter((e) => e != this.selectedEmployee);
      this.selectedEmployee = new Employee();
    }
  }

  // add() {
  //   if (this.employeeForm.valid) {
  //     this.employeeService.employeeList.push(this.employeeForm.value);
  //     console.log('this.employeeSErvuce.emlpoyeelist', this.employeeService.getEmployee());
  //   }
  // }

  // edit() {
  //   if (this.employeeForm.valid) {
  //     if (this.employeeService.employeeEdit(this.employeeForm.value)) {
  //       this.router.navigate(['/employee']);
  //     } else {
  //       console.log('something went wrong');
  //     }
  //   } else {
  //     console.log('Please complte form');
  //   }
  // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  matcher = new MyErrorStateMatcher();
}
