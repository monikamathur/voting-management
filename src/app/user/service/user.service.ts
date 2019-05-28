import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {APP_CONSTANTS} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiURL: any = APP_CONSTANTS.USER_API;

  constructor(private httpClient: HttpClient) { }

  public getUser() {
    return this.httpClient.get(this.userApiURL);
  }

}