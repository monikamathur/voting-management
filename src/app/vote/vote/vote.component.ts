import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { CandidatesService } from '../../candidates/service/candidates.service';
import { AccountService } from '../../accounts/service/account.service'
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  constructor(private userService: UserService,
     private toastr: ToastrService,
      private candidatesService: CandidatesService, private accountService: AccountService) {
       }
  candidatesData: any;
  userData : any;
  ngOnInit() {
    this.getCandidates();
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.accountService.getTokenData().userId).subscribe((data) => {
      debugger;
      this.userData = data[0];
    });
  }
  getCandidates() {
    this.candidatesService.getCandidates().subscribe((data) => {
      this.candidatesData = data;
    });
  }
  voteCandidates(candidate) {
    candidate['user_id'] = this.accountService.getTokenData().userId;
    console.log(candidate);
    this.candidatesService.voteCandidates(candidate).subscribe((data) => {
      this.toastr.success('You have voted successfully', 'Success');
      this.getUser();
    },(err)=>{
      this.toastr.error(err.error.message , 'Error');
    });
  }
  logout(){
    this.accountService.logout();
  }
}
