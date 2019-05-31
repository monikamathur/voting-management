import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder ,Validators} from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.fb.group({
    user_id: ['', Validators.required ],
    password: ['', Validators.required ]
 });
  submitted = false;;
  constructor(private fb: FormBuilder, private accountService: AccountService,
    private router: Router, private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {
    this.submitted == true
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe((data) => {
        if (data && data['token']) {
          this.toastr.success('You have logged in successfully', 'Success');
          localStorage.setItem('token', data['token']);
          if (data['user_type'] == 'admin') {
            this.router.navigate(['candidate']);
          } else {
            this.router.navigate(['vote']);
          }
        }
      }, (error) => {
        
        error && error.error && error.error.message && this.toastr.error(error.error.message, 'Error');
      });
    }

  }

}
