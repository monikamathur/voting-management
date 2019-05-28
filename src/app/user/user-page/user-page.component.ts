import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CandidatesService } from '../../candidates/service/candidates.service';

import { from } from 'rxjs';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private userService: UserService, private candidatesService: CandidatesService) { }
  candidatesData: any;
  ngOnInit() {
    this.getCandidates();
  }

  getUsers() {
    this.userService.getUser().subscribe((data) => {
    });
  }
  getCandidates() {
    this.candidatesService.getCandidates().subscribe((data) => {
      this.candidatesData = data;
    });
  }

  voteCandidates(candidate) {
    this.candidatesService.voteCandidates(candidate).subscribe((data) => {
     console.log('sdfsf');
    });
  }

}
