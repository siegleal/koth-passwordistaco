import { Component, OnInit } from '@angular/core';
import { MatchupService } from '../matchup.service';
import { Matchup } from '../matchup';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css']
})
export class ThisWeekComponent implements OnInit {
  week: number = 4;
  matchups: Matchup[];
  selectedTeam: string;

  constructor(private matchupService: MatchupService) { }

  ngOnInit() {
    this.matchups = this.matchupService.getMatchups(this.week);
  }

  public selectTeam(team: string): void {
    this.selectedTeam = team;

  }

  public setClasses(team: string): any {
    let classes = {
      'team': true,
      'selected': team === this.selectedTeam,
    }
    classes[team] = true;
    return classes;
  }

}
