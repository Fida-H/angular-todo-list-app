import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class TodoDialogComponent {
  todoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
      assignedName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const todoWithDate = {
        ...this.todoForm.value,
        date: currentDate
      };
      this.dialogRef.close(todoWithDate);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
