import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userEmail: string;


  constructor(private matchupService: MatchupService) { }

  ngOnInit() {
  this.matchupService.getMatchups(this.week).subscribe(data => {
    this.matchups = data;
  });
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

  public submit(): void {
    console.log('Submitting pick: ' + this.selectedTeam + ' with email: ' + this.userEmail);
  }

}
