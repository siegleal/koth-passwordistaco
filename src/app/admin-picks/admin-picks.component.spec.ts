import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPicksComponent } from './admin-picks.component';

describe('AdminPicksComponent', () => {
  let component: AdminPicksComponent;
  let fixture: ComponentFixture<AdminPicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
