import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // ✅ Check if user is logged in
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('loggedInUser');

  if (token && email) {
    return true; // 🔓 allow route
  }

  // ❌ Not logged in: redirect to login
  router.navigate(['/login']);
  return false;
};
