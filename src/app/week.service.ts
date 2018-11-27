import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

   public getReleasedWeek(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + '/api/week/released');
  }

   public getCurrentWeek(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + '/api/week/current');
  }

  /* returns {released: number, current: number} */
   public getReleasedAndCurrent(): Observable<any> {
    return this.httpClient.get<number>(this.baseUrl + '/api/week');
  }
}
