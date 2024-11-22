import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full'},
  {
    path: 'restaurants',
    component: RestaurantListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
