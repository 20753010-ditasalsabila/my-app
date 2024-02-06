import { Component } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginForm!: FormGroup;
  username = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  hide = true;
  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    if (username === "admin123" && password === "password") {
      this.router.navigate(['/employee'])
      alert('Login Successfully');
    } else {
      alert('Bad Credential')
    }
  }
}
