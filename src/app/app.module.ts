import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './accounts/login-page/login-page.component';
import { RegistrationPageComponent } from './accounts/registration-page/registration-page.component';
import { CandidatesPageComponent } from './candidates/candidates-page/candidates-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardPageComponent } from './shared/dashboard-page/dashboard-page.component';
import { VoteComponent } from './vote/vote/vote.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponentComponent } from './shared/loader-component/loader-component.component';
import {LoaderService} from './shared/service/loader.service'
import {InterceptorService} from './shared/service/interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    CandidatesPageComponent,
    UserPageComponent,
    DashboardPageComponent,
    VoteComponent,
    LoaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [
  ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
