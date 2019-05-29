import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CandidatesService } from '../../candidates/service/candidates.service';
import { AccountService } from '../../accounts/service/account.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private userService: UserService, private candidatesService: CandidatesService, private accountService: AccountService) { }
  userData: any;
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.userData =data;
    });
  }
  
}
