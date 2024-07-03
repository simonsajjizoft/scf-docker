import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  authToken: any;

  getToken() {
    if (typeof localStorage !== 'undefined') {
      if (this.authToken) return this.authToken;
      else {
        let token = localStorage.getItem('accessToken');
        if (token === null) return '';
        else return token;
      }
    } else return '';
  }

  getLoginToken() {
    if (typeof localStorage !== 'undefined') {
      let token = localStorage.getItem('LoginToken');
      if (token === null) return '';
      else return token;
    } else return '';
  }

  setHeaders(languageType?: string) {
    const currentLanguage = (typeof localStorage !== 'undefined' && localStorage.getItem('frenchView') && (localStorage.getItem('frenchView') === 'true')) ? 'fr' : 'en'
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-Xss-Protection': '1; mode=block',
      'accept-language': languageType ? languageType : currentLanguage
    });
    return header;
  }

  setLoginHeaders() {
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.getLoginToken()}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-Xss-Protection': '1; mode=block'
    });
    return header;
  }

  imageUpload(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  post(url: string, data: any, languageType?: string): Observable<any> {
    return this.http.post(url, data, { headers: this.setHeaders(languageType) });
  }

  postWithoutToken(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, { headers: this.setHeaders() });
  }

  patch(url:string,data:any):Observable<any>{
    return this.http.patch<any>(url, data, { headers: this.setHeaders() })
  }

  get(url: string, languageType?: string): Observable<any> {
    return this.http.get(url, { headers: this.setHeaders(languageType) });
  }

  getMetaData(url:string):Observable<any> {
    return this.http.get(url, { headers: {
      'Authorization': `Bearer ${this.getToken()}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-Xss-Protection': '1; mode=block',
      'Accept-Language':'en'
    } });
  }

  delete(url: string, options?: { body?: any, headers?: HttpHeaders }): Observable<any> {
    return this.http.delete(url, { ...options, headers: this.setHeaders() });
  }

  LoginPost(url: string, data: any): Observable<any> {
    return this.http.post(url, data, { headers: this.setLoginHeaders() });
  }

  refreshToken(): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      const payload = { refreshToken: localStorage.getItem('refreshToken') };
      return this.http.post<any>(environment?.authApiUrl + '/refresh-token', payload).pipe(
        catchError(error => {
          return throwError(error);
        })
      )
     } else return new Observable();
  }
}
