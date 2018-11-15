import { Injectable } from '@angular/core';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamnamesService {
  private TEAMS: { [abbr: string]: Team } = {
    'ARI': new Team( 'ARI',  'Arizona',         'Cardinals'),
    'ATL': new Team( 'ATL',  'Atlanta',         'Falcons'),
    'BAL': new Team( 'BAL',  'Baltimore',       'Ravens'),
    'BUF': new Team( 'BUF',  'Buffalo',         'Bills'),
    'CAR': new Team( 'CAR',  'Carolina',        'Panthers'),
    'CHI': new Team( 'CHI',  'Chicago',         'Bears'),
    'CIN': new Team( 'CIN',  'Cincinnati',      'Bengals'),
    'CLE': new Team( 'CLE',  'Cleveland',       'Browns'),
    'DAL': new Team( 'DAL',  'Dallas',          'Cowboys'),
    'DEN': new Team( 'DEN',  'Denver',          'Broncos'),
    'DET': new Team( 'DET',  'Detroit',         'Lions'),
    'GB':  new Team( 'GB',   'Green Bay',       'Packers'),
    'HOU': new Team( 'HOU',  'Houston',         'Texans'),
    'IND': new Team( 'IND',  'Indianapolis',    'Colts'),
    'JAX': new Team( 'JAX',  'Jacksonville',    'Jaguars'),
    'KC':  new Team( 'KC',   'Kansas City',     'Chiefs'),
    'LAC': new Team( 'LAC',  'Los Angeles',     'Chargers'),
    'LAR': new Team( 'LAR',  'Los Angeles',     'Rams'),
    'MIA': new Team( 'MIA',  'Miami',           'Dolphins'),
    'MIN': new Team( 'MIN',  'Minnesota',       'Vikings'),
    'NE':  new Team( 'NE',   'New England',     'Patriots'),
    'NO':  new Team( 'NO',   'New Orleans',     'Saints'),
    'NYG': new Team( 'NYG',  'New York',        'Giants'),
    'NYJ': new Team( 'NYJ',  'New York',        'Jets'),
    'OAK': new Team( 'OAK',  'Oakland',         'Raiders'),
    'PHI': new Team( 'PHI',  'Philadelphia',    'Eagles'),
    'PIT': new Team( 'PIT',  'Pittsburgh',      'Steelers'),
    'SEA': new Team( 'SEA',  'Seattle',         'Seahawks'),
    'SF':  new Team( 'SF',   'San Francisco',   '49ers'),
    'TB':  new Team( 'TB',   'Tampa Bay',       'Buccaneers'),
    'TEN': new Team( 'TEN',  'Tennessee',       'Titans'),
    'WAS': new Team( 'WAS',  'Washington',      'Redskins'),
  };

  constructor() { }

  public getFullTeamName(abbr: string): string {
    return this.TEAMS[abbr].getFullName();
  }

}
