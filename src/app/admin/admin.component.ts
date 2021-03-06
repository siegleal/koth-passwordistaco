import { Component, OnInit } from '@angular/core';
import { MatchupService } from '../matchup.service';
import { Matchup } from '../matchup';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  matchups: Matchup[];
  weekNum: number = 1;

  constructor(private matchupService: MatchupService) { }

  ngOnInit() {
    this.getMatchups(1);
  }

  getMatchups(week: number): void {
    console.log('getting week ' + week);
    this.matchupService.getMatchups(week).subscribe(data => {
      this.matchups = data;
      console.log(`Got ${this.matchups.length} rows`);
    });
  }

  saveMatchups(): void{
    this.matchupService.saveMatchups(this.matchups);
  }

}
