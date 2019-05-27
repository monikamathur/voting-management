import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('login', this.loginForm.value);
  }

}
