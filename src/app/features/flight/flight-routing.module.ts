import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlightSearchComponent } from './flight-search/flight-search.component';

const routes: Routes = [
  {
    path: 'search',
    component: FlightSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }