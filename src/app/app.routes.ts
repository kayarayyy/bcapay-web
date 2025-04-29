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
import { ProfileComponent } from './features/profile/profile.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { ReviewLoanComponent } from './features/review-loan/review-loan.component';
import { featureGuard } from './core/guards/feature.gurad';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [featureGuard('FEATURE_MANAGE_USERS')],
      },
      {
        path: 'branches',
        component: BranchComponent,
        canActivate: [featureGuard('FEATURE_MANAGE_BRANCHES')],
      },
      {
        path: 'loan-requests',
        children: [
          {
            path: '',
            canActivate: [featureGuard('FEATURE_MANAGE_LOAN_REQUESTS', 'FEATURE_GET_ALL_LOAN_REQUEST_REVIEW', 'FEATURE_GET_ALL_LOAN_REQUEST_APPROVAL')],
            component: LoanRequestComponent,
          },
          {
            path: 'review/:id',
            component: ReviewLoanComponent,
            canActivate: [featureGuard('FEATURE_MANAGE_LOAN_REQUESTS', 'FEATURE_GET_LOAN_REQUEST_BY_ID_REVIEW', 'FEATURE_GET_LOAN_REQUEST_BY_ID_APPROVAL')],
          },
        ],
      },
      {
        path: 'roles',
        component: RoleComponent,
        canActivate: [featureGuard('FEATURE_MANAGE_ROLES')],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [featureGuard('VIEW_PROFILE')],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [featureGuard('CHANGE_PASSWORD')],
      },
    ],
  },
  // auth layout tetap
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
        canActivate: [redirectIfLoggedInGuard],
      },
      {
        path: 'reset-password/:id',
        component: ResetPasswordComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
