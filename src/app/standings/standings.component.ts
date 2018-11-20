import { Component, OnInit } from '@angular/core';
import { PicksForUser } from '../picksforuser';
import { PickService } from '../pick.service';
import { Users } from '../users';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  allPicks: PicksForUser[] = [];
  showAll: boolean = false;
  thruWeek: number = 12;


  constructor(private pickService: PickService) { }

  reload() : void {
    Users.USERS.forEach(user => {
      this.pickService.getPicksForUser(user.email, this.thruWeek).subscribe(picks => {
        this.allPicks.push(new PicksForUser(user.name, picks));
        this.allPicks.sort((a,b) => a.getTotal() > b.getTotal() ? -1 : 1);
      });
    })

  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  ngOnInit() {
    this.reload();
  }

}
