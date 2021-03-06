import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../accounts/service/account.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AccountService,  private router: Router
    ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.auth.isTokenExpired()) {
      if(state.url == '/' || state.url == "/login"){
        if(this.auth.isAdmin()){
          this.router.navigate(['/candidate']);
        }else{
          this.router.navigate(['/vote']);
        }
       }
      return true;
    }
    if (this.auth.isTokenExpired()) {
      if(state.url == '/' || state.url == "/login"){
        return true;
      }else{
        this.router.navigate(['login']);
      }
      return false;
    }
  }
}
