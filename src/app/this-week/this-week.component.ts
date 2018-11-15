import { Component, OnInit, Input } from '@angular/core';
import { MatchupService } from '../matchup.service';
import { TeamnamesService } from '../teamnames.service';
import { PickService } from '../pick.service';
import { Matchup } from '../matchup';
import { Pick } from '../pick';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css']
})
export class ThisWeekComponent implements OnInit {
  week: number = 11;
  matchups: Matchup[];
  selectedTeam: string;
  pick: Pick;
  error: string;
  success: string;


  constructor(private matchupService: MatchupService, 
    private teamnamesService: TeamnamesService,
    private pickService: PickService) {
    this.pick = new Pick();
    this.pick.week = this.week;
   }

  ngOnInit() {
  this.matchupService.getMatchups(this.week).subscribe(data => {
    this.matchups = data;
  });
  }

  public getTeamName(teamAbbr: string): string {
    return this.teamnamesService.getFullTeamName(teamAbbr);
  }

  public selectTeam(team: string): void {
    this.selectedTeam = team;
    this.pick.team = team;

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
    if (this.pick.email === undefined){
      console.log('Cannot submit. Need email');
      this.error = 'Must enter an email';
      this.success = '';
    } else{
      if (this.pick.email.match(/[a-zA-z0-9]+@(gmail\.com|dayspringvalpo\.org)/g) != null ){
      console.log('Submitting pick: ' + this.selectedTeam + ' with email: ' + this.pick.email);
      this.error = '';
      this.success = 'Submitted pick ' + this.selectedTeam + ' as ' + this.pick.email;
      this.pickService.putPick(this.pick).subscribe({
        complete: () => {
          this.success = 'Submitted pick ' + this.selectedTeam + ' as ' + this.pick.email;
        },
        error: () => console.log('Error while putting pick')
      });
      } else {
        this.error = 'Must enter a valid gmail address';
        this.success = '';
      }

    }
  }

}
