import { Component, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { Pick } from '../pick';
import { Users } from '../users';
import { PicksForUser } from '../picksforuser';

@Component({
  selector: 'app-admin-picks',
  templateUrl: './admin-picks.component.html',
  styleUrls: ['./admin-picks.component.css']
})
export class AdminPicksComponent implements OnInit {
  
  private allPicks: PicksForUser[] = [];


  constructor(private pickService: PickService) { }

  reload() : void {
    Users.USERS.forEach(user => {
      this.pickService.getPicksForUser(user.email, 17).subscribe(picks => {
        this.allPicks.push(new PicksForUser(user.name, picks));
        this.allPicks.sort((a,b) => a.name < b.name ? -1 : 1);
      });
    })

  }

  updateWeek(week: number): void {
    console.log("updating week " + week);
    this.allPicks.forEach(ap => {
      this.update(ap.picks.filter(p => p.week === week));
    })
  }

  ngOnInit() {
    this.reload();
  }

  update(picks: Pick[]): void {
    picks.forEach(pick => {
      this.pickService.getScoreForWeek(pick.week, pick.team).subscribe(diff => {
        pick.points = diff;
        this.pickService.putPick(pick).subscribe(p => pick = p);
      });
    });
  }

}
