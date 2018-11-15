import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pick } from './pick';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PickService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public putPick(pick: Pick): Observable<Pick> {
    return this.httpClient.put<Pick>(this.baseUrl + '/makePick/', pick);
  }

  public getPicksForWeek(week: number): Observable<Pick[]> {
    return this.httpClient.get<Pick[]>(this.baseUrl + '/getPicks/' + week);
  }

  public getPicksForUser(email: string): Observable<Pick[]> {
    return this.httpClient.get<Pick[]>(this.baseUrl + '/getPicks?e=' + email);
  }
}
