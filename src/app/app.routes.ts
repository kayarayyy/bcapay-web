import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home.component';
import { UserComponent } from './features/user/pages/user.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/login/pages/login.component';
import { authGuard } from './core/guards/auth.guard'; // pastikan path-nya sesuai
import { redirectIfLoggedInGuard } from './core/guards/redirect.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard], // ✅ lindungi MainLayout dan anak-anaknya
    children: [
      { path: '', redirectTo: 'home', pathMatch:'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo:'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
        canActivate: [redirectIfLoggedInGuard]
      },
    ],
  },
  { path: '**', redirectTo: '/login' } // catch-all fallback
];
