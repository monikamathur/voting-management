import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './accounts/login-page/login-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { CandidatesPageComponent } from './candidates/candidates-page/candidates-page.component';
import { VoteComponent } from './vote/vote/vote.component';
import { DashboardPageComponent } from './shared/dashboard-page/dashboard-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginPageComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'candidate',
        component: CandidatesPageComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'user',
        component: UserPageComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: 'vote',
    component: VoteComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
