import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './signin.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const { email, password } = this.loginForm.value;

      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInUser', email);

        this.snackBar.open('✅ Login successful!', 'Close', {
          duration: 3000,
        });
        console.log('Login success, navigating to todos-list...');
        this.router.navigate(['/todos-list']);

        
        } 
      else {
        this.snackBar.open('❌ Invalid credentials! Redirecting to signup...', 'Close', {
          duration: 3000,
        });

        // ❌ Navigate to signup
        this.router.navigate(['/signup']);
      }
    }
  }
}

