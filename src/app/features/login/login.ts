import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loading = false;
  error = '';
  API = 'http://localhost:8080'; // backend local

  form: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  submit() {
    this.loading = true;
    this.http.post<{ token: string, expiresInSeconds: number }>(`${this.API}/auth/login`, this.form.value)
      .subscribe({
        next: r => {
          localStorage.setItem('jwt', r.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: () => {
          this.error = 'Credenciais inválidas';
          this.loading = false;
        }
      });
  }
}
