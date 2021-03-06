import { Component, OnInit, Input } from '@angular/core';
import { MatchupService } from '../matchup.service';
import { TeamnamesService } from '../teamnames.service';
import { PickService } from '../pick.service';
import { Matchup } from '../matchup';
import { Pick } from '../pick';
import { WeekService } from '../week.service';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css']
})
export class ThisWeekComponent implements OnInit {
  week: number;
  matchups: Matchup[];
  selectedTeam: string;
  pick: Pick;
  error: string;
  success: string;
  previousPicks: Pick[];
  deadlinePassed: boolean = true;


  constructor(private matchupService: MatchupService, 
    private teamnamesService: TeamnamesService,
    private pickService: PickService,
    private weekService: WeekService) {
    this.pick = new Pick();
   }

  ngOnInit() {
  this.weekService.getReleasedAndCurrent().subscribe(data =>{
    this.week = data.current;
    this.matchupService.getMatchups(data.current).subscribe(data => {
      this.matchups = data;
    });
    this.deadlinePassed = data.released === data.current;
  })
  }

  public getTeamName(teamAbbr: string): string {
    return this.teamnamesService.getFullTeamName(teamAbbr);
  }
  
  public getPreviousPicks(email: string): void {
  	this.pickService.getPicksForUser(email, this.week).subscribe(
  		picks => this.previousPicks = picks
  	);
  }

  public selectTeam(team: string): void {
  	if (!this.hasPickedTeam(team) && !this.deadlinePassed){
    	this.selectedTeam = team;
    	this.pick.team = team;
	}


  }
  
  private hasPickedTeam(team: string): boolean{
  	return this.previousPicks !== undefined ? this.previousPicks.map(p => p.team).includes(team) : false;
  }

  public setClasses(team: string): any {
    let classes = {
      'team': true,
      'selected': team === this.selectedTeam,
      'picked': this.hasPickedTeam(team),
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
        this.pick.week = this.week;
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
