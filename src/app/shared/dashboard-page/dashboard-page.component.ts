import { Component, OnInit } from '@angular/core';
import {AccountService} from './../../accounts/service/account.service';
import { UserService } from '../../user/service/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private accountService:AccountService, private userService: UserService) { }
  userData;
  ngOnInit() {
    this.getUser();

  }
  getUser() {
    this.userService.getUser(this.accountService.getTokenData().userId).subscribe((data) => {
      debugger;
      this.userData = data[0];
    });
  }

  logout(){
    this.accountService.logout();
  }

}
