import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ThisWeekComponent } from './this-week/this-week.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReleasedComponent } from './released/released.component';
import { MatchupDetailComponent } from './matchup-detail/matchup-detail.component';
import { AdminComponent } from './admin/admin.component';
import { ScoreDetailComponent } from './score-detail/score-detail.component';
import { AdminPicksComponent } from './admin-picks/admin-picks.component';
import { StandingsComponent } from './standings/standings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThisWeekComponent,
    ReleasedComponent,
    MatchupDetailComponent,
    AdminComponent,
    ScoreDetailComponent,
    AdminPicksComponent,
    StandingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
