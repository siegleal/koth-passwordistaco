import { Component, OnInit, Input } from '@angular/core';
import { Matchup } from '../matchup';

@Component({
  selector: 'score-detail',
  templateUrl: './score-detail.component.html',
  styleUrls: ['./score-detail.component.css']
})
export class ScoreDetailComponent implements OnInit {
  @Input() matchup: Matchup;

  constructor() { }

  ngOnInit() {
  }

}
