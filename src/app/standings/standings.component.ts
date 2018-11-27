import { Component, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { WeekService } from '../week.service';
import { UserPick } from '../userpick';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  allPicks: UserPick[];
  showAll: boolean = false;
  thruWeek: number;


  constructor(private pickService: PickService, private weekService: WeekService) { }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  ngOnInit() {
    this.weekService.getCurrentWeek().subscribe(week => {
      this.pickService.getAllPicksBeforeWeek(week).subscribe( userpicks => {
        this.allPicks = userpicks.map<UserPick>(x => new UserPick(x)).sort((x,y) => y.getTotal() -x.getTotal());
      })
    })
  }

}
