import { Injectable } from '@angular/core';
import { Matchup } from './matchup';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchupService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getMatchups(week: number): Observable<Matchup[]>{
    return this.httpClient.get<Matchup[]>(this.baseUrl + "/schedule/" + week);
  }

}
