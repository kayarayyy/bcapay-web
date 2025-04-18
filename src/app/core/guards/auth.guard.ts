import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSessionService } from '../services/auth-session.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const session = inject(AuthSessionService);

  // ✅ Cek aman apakah berjalan di browser
  if (typeof window !== 'undefined' && session.token) {
    return true;
  }


  router.navigate(['/login']);
  return false;
};
