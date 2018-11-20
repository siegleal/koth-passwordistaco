import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThisWeekComponent }	from './this-week/this-week.component';
import { ReleasedComponent }	from './released/released.component';
import { AdminComponent }	from './admin/admin.component';
import { AdminPicksComponent } from './admin-picks/admin-picks.component';
import { StandingsComponent } from './standings/standings.component';

const appRoutes: Routes = [
  { path: 'pick', component: ThisWeekComponent },
  { path: 'released', component: ReleasedComponent},
  { path: 'standings', component: StandingsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin/picks', component: AdminPicksComponent},
  { path: '',
    redirectTo: '/pick',
    pathMatch: 'full'
  },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(appRoutes) ],
})
export class AppRoutingModule {}
