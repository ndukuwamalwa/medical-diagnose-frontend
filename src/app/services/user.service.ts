import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http } from './http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtHelper = new JwtHelperService();

  constructor(private http: Http, private httpRaw: HttpClient) { }

  update(data: User): Observable<any> {
    return this.http._put(`${environment.apiUrl}/users`, data);
  }

  info(): User {
    const token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

  register(data: User): Observable<any> {
    return this.httpRaw.post<any>(`${environment.apiUrl}/users`, data);
  }

}
