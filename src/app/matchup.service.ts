import { Injectable } from '@angular/core';
import { Matchup } from './matchup';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeeklyScore } from './weeklyscore';

@Injectable({
  providedIn: 'root'
})
export class MatchupService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getMatchups(week: number): Observable<Matchup[]>{
    return this.httpClient.get<Matchup[]>(this.baseUrl + "/api/schedule/" + week);
  }

  public saveMatchups(matchups: Matchup[]): void {
    matchups.forEach( elem => {
      this.httpClient.put<Matchup>(this.baseUrl + '/api/schedule/', elem).subscribe(json => console.log(json));
      this.httpClient.put<WeeklyScore>(this.baseUrl + '/api/weeklyscore/', WeeklyScore.fromMatchup(elem, true)).subscribe(json => console.log(json));
      this.httpClient.put<WeeklyScore>(this.baseUrl + '/api/weeklyscore/', WeeklyScore.fromMatchup(elem, false)).subscribe(json => console.log (json));
    })

  }

}
