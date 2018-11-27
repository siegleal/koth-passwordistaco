import { Component, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { WeekService } from '../week.service';
import { Pick }	from '../pick';
import { Users } from '../users';

@Component({
  selector: 'app-released',
  templateUrl: './released.component.html',
  styleUrls: ['./released.component.css']
})
export class ReleasedComponent implements OnInit {
  week: number;
	picks: Pick[];

  constructor(private pickService: PickService, private weekService: WeekService) { }

  ngOnInit() {
    this.weekService.getReleasedWeek().subscribe(week => {
      this.week = week;
      this.pickService.getPicksForWeek(week).subscribe(picks => this.picks = picks);
    })
  }
  
  public getNameFromEmail(email: string): string {
		return Users.USERS.filter(u => u.email === email)[0].name;
  }

}
