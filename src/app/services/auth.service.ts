import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  isLoggedIn(): boolean {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }

  logout(): void {
    window.localStorage.removeItem('token');
  }

  setToken(token: string): void {
    window.localStorage.setItem('token', token);
  }
}
