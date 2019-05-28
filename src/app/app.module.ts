import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './accounts/login-page/login-page.component';
import { RegistrationPageComponent } from './accounts/registration-page/registration-page.component';
import { CandidatesPageComponent } from './candidates/candidates-page/candidates-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardPageComponent } from './shared/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    CandidatesPageComponent,
    UserPageComponent,
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
