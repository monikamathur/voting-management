import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    user_id: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private accountService: AccountService,
    private router: Router,  private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {

    console.log('login', this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe((data) => {
      if (data && data['token']) {
        this.toastr.success('You have loggedin successfully','Success');

        localStorage.setItem('token', data['token']);
        if(data['user_type'] == 'admin'){
        this.router.navigate(['candidate']);
        }else{
        this.router.navigate(['vote']);
        }
      }
    },(error)=>{
      this.toastr.error(error.error.message, 'Error');
    });
  }

}
