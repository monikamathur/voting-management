import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { finalize } from "rxjs/operators";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let authReq = req;
    if (req.url != 'api/login' && localStorage.getItem('token')) {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        })
      });
    }

    return next.handle(authReq).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
