import { Matchup } from './matchup';

export class WeeklyScore {
    week: number;
    team: string;
    score: number;
    diff: number;

    constructor(week: number, team: string, score: number, diff: number){
        this.week = week;
        this.team = team;
        this.score = score;
        this.diff = diff;
    }

    public static fromMatchup(matchup: Matchup, homeTeam: boolean): WeeklyScore{
        if (homeTeam){
            return new WeeklyScore(matchup.week, matchup.homeTeam, matchup.homeScore, matchup.homeScore - matchup.awayScore);
        } else{
            return new WeeklyScore(matchup.week, matchup.awayTeam, matchup.awayScore, matchup.awayScore - matchup.homeScore);
        }

    }
}