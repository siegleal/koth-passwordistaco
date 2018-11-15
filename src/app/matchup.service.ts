import { Injectable } from '@angular/core';
import { Matchup } from './matchup';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchupService {

  constructor(private httpClient: HttpClient) { }

  public getMatchups(week: number): Observable<Matchup[]>{
    return this.httpClient.get<Matchup[]>("/api/schedule/" + week);
  }

}
