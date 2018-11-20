import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupDetailComponent } from './matchup-detail.component';

describe('MatchupDetailComponent', () => {
  let component: MatchupDetailComponent;
  let fixture: ComponentFixture<MatchupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
