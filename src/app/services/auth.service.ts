// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private usersKey = 'users';
//   private loggedInUserKey = 'loggedInUser';

//   // Signup a new user
//   signup(email: string, password: string): Observable<{ message: string }> {
//     const users: Array<{ email: string; password: string }> =
//       JSON.parse(localStorage.getItem(this.usersKey) || '[]');

//     const exists = users.find((u) => u.email === email);

//     if (exists) {
//       return of({ message: 'User already exists' });
//     }

//     users.push({ email, password });
//     localStorage.setItem(this.usersKey, JSON.stringify(users));
//     return of({ message: 'Signup successful' });
//   }

//   // Signin existing user
//   signin(email: string, password: string): boolean {
//     const users: Array<{ email: string; password: string }> =
//       JSON.parse(localStorage.getItem(this.usersKey) || '[]');

//     const match = users.find((u) => u.email === email && u.password === password);

//     if (match) {
//       localStorage.setItem(this.loggedInUserKey, email);
//       return true;
//     }

//     return false;
//   }

//   // Logout current user
//   logout(): void {
//     localStorage.removeItem(this.loggedInUserKey);
//   }

//   // Get current logged-in user
//   getLoggedInUser(): string | null {
//     return localStorage.getItem(this.loggedInUserKey);
//   }
// }
