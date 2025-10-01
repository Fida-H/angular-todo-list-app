// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  addTodo(title: string) {
    const currentTodos = this.todosSubject.value;
    const newTodo: Todo = { title, completed: false };
    this.todosSubject.next([...currentTodos, newTodo]);
  }

  toggleCompleted(index: number) {
    const updatedTodos = this.todosSubject.value.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(updatedTodos);
  }
}
