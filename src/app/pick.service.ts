import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pick } from './pick';
import { Observable, of, zip } from 'rxjs';
import { environment } from '../environments/environment';
import { Users } from './users';
import { PicksForUser } from './picksforuser';

@Injectable({
  providedIn: 'root'
})
export class PickService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public putPick(pick: Pick): Observable<Pick> {
    return this.httpClient.put<Pick>(this.baseUrl + '/api/makePick/', pick);
  }

  public getPicksForWeek(week: number): Observable<Pick[]> {
    return this.httpClient.get<Pick[]>(this.baseUrl + '/api/getPicks/' + week);
  }

  public getPicksForUser(email: string, currWeek: number): Observable<Pick[]> {
    return this.httpClient.get<Pick[]>(this.baseUrl + '/api/getPicks?e=' + email + "&w=" + currWeek);
  }

  public getScoreForWeek(week: number, team: string): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + '/api/diff/' + team + '/' + week);
  }

}
