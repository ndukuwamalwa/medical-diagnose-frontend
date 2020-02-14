import { Injectable } from '@angular/core';
import { Http } from './http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Diagnosis } from '../models/diagnosis.model';
import { PatientInfo } from '../models/patient-info.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: Http) { }

  diagnose(data: PatientInfo): Observable<any> {
    return this.http._post(`${this.apiUrl}/diagnose`, data);
  }

  save(data: Diagnosis): Observable<any> {
    return this.http._post(`${this.apiUrl}/diagnosis`, data);
  }

  history(startDate: string, endDate: string): Observable<any> {
    return this.http._get(`${this.apiUrl}/users/history?startDate=${startDate}&endDate=${endDate}`);
  }

  delete(id: number): Observable<any> {
    return this.http._delete(`${this.apiUrl}/diagnosis?id=${id}`);
  }

  stats(): Observable<any> {
    return this.http._get(`${this.apiUrl}/diagnosis/stats`);
  }

  symptoms(): Observable<any> {
    return this.http._get(`${this.apiUrl}/symptoms`);
  }

  validate(id: number, valid: boolean): Observable<any> {
    return this.http._put(`${this.apiUrl}/diagnosis/validate?valid=${valid}`, { id });
  }
}
