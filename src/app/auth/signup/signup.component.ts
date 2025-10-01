import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ✅ Import snackbar

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule, // ✅ Add to imports
    RouterModule,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar // ✅ Inject snackbar
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = this.signupForm.value;

      const alreadyExists = users.some((u: any) => u.email === newUser.email);

      if (alreadyExists) {
        this.snackBar.open('⚠️ User already exists!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return;
      }

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      this.snackBar.open('✅ Signup successful! Redirecting to login...', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });

      this.router.navigate(['/login']);
    }
  }
}
