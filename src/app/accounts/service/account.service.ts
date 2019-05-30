import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../../app.constants';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loginApiURL: any = APP_CONSTANTS.LOGIN_API;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(data) {
    return this.httpClient.post(this.loginApiURL, data);
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(new Date(date).valueOf() > new Date().valueOf());
  }

  isAdmin(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return false;

    let decoded = jwt_decode(token);
    if (decoded.userType === 'admin') return true;
    return false;
  }

  getTokenData(token?: string): any {
    if (!token) token = this.getToken();
    return jwt_decode(token);
  }
}
