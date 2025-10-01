// src/app/todos/todo-list/todo-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'; // ✅ Import this


@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [MatCardModule, MatTableModule, MatButtonModule, TodoDialogComponent,MatToolbarModule]
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  displayedColumns: string[] = ['index', 'task', 'assignedName', 'date'];
  dialog = inject(MatDialog);
  router = inject(Router);
  user: any = null;
  userEmail: string | null | undefined;

  ngOnInit(): void {


    
    this.userEmail = localStorage.getItem('loggedInUser');
    console.log(this.userEmail)
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUser(); // ✅ Will also call initializeDummyTodos after setting user
  }

  loadUser(): void {
    const authData = localStorage.getItem('authData');
    const loggedInEmail = localStorage.getItem('loggedInUser');

    if (authData && loggedInEmail) {
      const parsed = JSON.parse(authData);
      if (parsed.email === loggedInEmail) {
        this.user = parsed;

        this.initializeDummyTodos();// ✅ Initialize dummy todos only after user is available
      }
    }
  }

  initializeDummyTodos(): void {
    const allTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    console.log(allTodos)
    const userEmail = this.user?.email;

    const userHasTodos = allTodos.some((todo: any) => todo.userEmail === userEmail);

    if (!userHasTodos && userEmail) {
      const dummyTodos = [
        { task: 'Buy ', assignedName: 'Ali', date: '2025-08-01', userEmail },
        { task: 'Submit ', assignedName: 'Sara', date: '2025-08-02', userEmail }
      ];

      const updatedTodos = [...allTodos, ...dummyTodos];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    this.loadTodos(); // ✅ Refresh table after inserting dummy
  }

  loadTodos(): void {
    const userEmail = localStorage.getItem('loggedInUser');
    const allTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    this.todos = allTodos
      .filter((todo: any) => todo.userEmail === userEmail)
      .map((todo: any, index: number) => ({ ...todo, index: index + 1 }));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const userEmail = localStorage.getItem('loggedInUser');
        const currentDate = new Date().toISOString().split('T')[0];

        const newTodo = {
          ...result,
          userEmail,
          date: result.date || currentDate
        };

        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        this.loadTodos(); // ✅ Refresh table
      }
    });
  }
}
