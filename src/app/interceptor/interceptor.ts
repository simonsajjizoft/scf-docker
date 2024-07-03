import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const currentLanguage = (typeof localStorage !== 'undefined' && localStorage.getItem('frenchView') && (localStorage.getItem('frenchView') === 'true')) ? 'fr' : 'en'
    // const clonedRequest = request.clone({
    //   setHeaders: {
    //     'accept-language': currentLanguage
    //   }
    // });
    return next.handle(request)
      .pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err?.status === 401) { // invalid token
            return this.handle401Error(request, next);
          } else {
            return throwError(err);
          }
        }
        return new Observable<HttpEvent<any>>();
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return this.apiService.refreshToken().pipe(
      switchMap((data: any) => {
        if(data?.accessToken && typeof localStorage !== 'undefined') localStorage.setItem('accessToken', data?.accessToken);
        const newRequest = this.addTokenToRequest(request);
        return next.handle(newRequest);
      }),
      catchError((error) => {
        this.logout();
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('accessToken') : '';
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
