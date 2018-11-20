import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThisWeekComponent }	from './this-week/this-week.component';
import { ReleasedComponent }	from './released/released.component';
import { AdminComponent }	from './admin/admin.component';

const appRoutes: Routes = [
  { path: 'pick', component: ThisWeekComponent },
  { path: 'released', component: ReleasedComponent},
  { path: 'admin', component: AdminComponent},
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
