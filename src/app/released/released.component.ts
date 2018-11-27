import { Component, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { Pick }	from '../pick';
import { Users } from '../users';

@Component({
  selector: 'app-released',
  templateUrl: './released.component.html',
  styleUrls: ['./released.component.css']
})
export class ReleasedComponent implements OnInit {
	week: number = 12;
	picks: Pick[];

  constructor(private pickService: PickService) { }

  ngOnInit() {
  	this.pickService.getPicksForWeek(this.week).subscribe(picks => this.picks = picks);
  }
  
  public getNameFromEmail(email: string): string {
		return Users.USERS.filter(u => u.email === email)[0].name;
  }

}
