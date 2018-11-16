import { Component, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { Pick }	from '../pick';

@Component({
  selector: 'app-released',
  templateUrl: './released.component.html',
  styleUrls: ['./released.component.css']
})
export class ReleasedComponent implements OnInit {
	week: number = 10;
	picks: Pick[];

  constructor(private pickService: PickService) { }

  ngOnInit() {
  	this.pickService.getPicksForWeek(this.week).subscribe(picks => this.picks = picks);
  }
  
  public getNameFromEmail(email: string): string {
  	const USERS = [
	{"name": "Alex", "email": "alexander.pavlakis90@gmail.com"},
	{"name": "Andrew", "email": "asiegle@gmail.com"},
	{"name": "Michael", "email": "seagull798@gmail.com"},
	{"name": "Joel", "email": "joeljones531@gmail.com"},
	{"name": "Geralyn", "email": "geralynroz1529@gmail.com"},
	{"name": "Eric", "email": "egibbons1990@gmail.com"},
	{"name": "Aly", "email": "alyg@dayspringvalpo.org"},
	{"name": "Nick", "email": "nickwest1016@gmail.com"},
	{"name": "Erica", "email": "ericawest1012@gmail.com"},
	{"name": "Chelsea", "email": "cdoy1125@gmail.com"},
	{"name": "Thomas", "email": "teumerthomas74@gmail.com"},
	{"name": "Matt", "email": "moleary5252@gmail.com"},
	{"name": "Erin", "email": "emcoulson24@gmail.com"}
	];
	
	return USERS.filter(u => u.email === email)[0].name;
  }

}
