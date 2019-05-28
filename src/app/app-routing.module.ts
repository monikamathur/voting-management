import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './accounts/login-page/login-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { DashboardPageComponent } from './shared/dashboard-page/dashboard-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: LoginPageComponent },
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'candidate',
        component: UserPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
