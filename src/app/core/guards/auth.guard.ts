import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // ✅ Cek aman apakah berjalan di browser
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
