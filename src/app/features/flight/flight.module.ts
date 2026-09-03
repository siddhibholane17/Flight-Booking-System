import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSearchFormComponent } from './flight-search/flight-search-form/flight-search-form.component';

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlightRoutingModule
  ]
})
export class FlightModule { }