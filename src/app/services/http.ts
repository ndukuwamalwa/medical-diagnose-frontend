import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class Http extends HttpClient {
    jwtHelper = new JwtHelperService();

    _get(url: string): Observable<any> {
        return this.get<any>(url, { headers: this.headers() });
    }

    _post(url: string, data): Observable<any> {
        return this.post<any>(url, data, { headers: this.headers() });
    }

    _put(url: string, data): Observable<any> {
        return this.put<any>(url, data, { headers: this.headers() });
    }

    _delete(url: string): Observable<any> {
        return this.delete<any>(url, { headers: this.headers() });
    }

    headers(): HttpHeaders {
        let headers = new HttpHeaders();
        // HttpHeaders is immutable, appending to the created object won't set the header
        const token = window.localStorage.getItem('token');
        if (this.jwtHelper.isTokenExpired(token) === true) {
            // window.location.reload();
            return;
        }
        headers = headers.append('Authorization', `Bearer ${token}`);
        return headers;
    }
}
