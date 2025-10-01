// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes =   [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'todos-list',
    component: TodoListComponent,
    canActivate: [AuthGuard] // ✅ apply guard here
  },
    { path: 'todos-list', component: TodoListComponent,}, // 👈 guard added

];
