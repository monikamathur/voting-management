import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['user']);

    console.log('login', this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe((data) => {
      if (data && data['token']) {
        localStorage.setItem('token', data['token']);
        // this.router.navigate(['dashboard/user']);
      }
    });
  }

}
