import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/user/user.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard'; // pastikan path-nya sesuai
import { redirectIfLoggedInGuard } from './core/guards/redirect.guard';
import { BranchComponent } from './features/branches/branch.component';
import { LoanRequestComponent } from './features/loan-request/loan-request.component';
import { RoleComponent } from './features/role/role.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard], // ✅ lindungi MainLayout dan anak-anaknya
    children: [
      { path: '', redirectTo: 'home', pathMatch:'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserComponent },
      { path: 'branches', component: BranchComponent },
      { path: 'loan-requests', component: LoanRequestComponent },
      { path: 'roles', component: RoleComponent },
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
