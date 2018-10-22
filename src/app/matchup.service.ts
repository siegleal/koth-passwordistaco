import { Injectable } from '@angular/core';
import { Matchup } from './matchup';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchupService {
  private ALLMATCHUPS: Matchup[] = [
    { week: 1, homeTeam: "CHI", awayTeam: "GB", homeScore: 0, awayScore: 0},
    { week: 1, homeTeam: "PHI", awayTeam: "ATL", homeScore: 0, awayScore: 0},
    { week: 2, homeTeam: "BUF", awayTeam: "GB", homeScore: 0, awayScore: 0},
    { week: 2, homeTeam: "TB", awayTeam: "LAC", homeScore: 0, awayScore: 0},
    { week: 3, homeTeam: "SF", awayTeam: "LAR", homeScore: 0, awayScore: 0},
    { week: 4, homeTeam: "CIN", awayTeam: "MIA", homeScore: 0, awayScore: 0},
    { week: 4, homeTeam: "MIN", awayTeam: "HOU", homeScore: 0, awayScore: 0},
    { week: 4, homeTeam: "NYG", awayTeam: "SEA", homeScore: 0, awayScore: 0},
  ]

  constructor(private httpClient: HttpClient) { }

  public getMatchups(week: number): Matchup[]{
    return this.ALLMATCHUPS.filter(m => m.week === 4);
  }
  
}
