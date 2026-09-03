import { Component } from '@angular/core';

import { Flight } from '../../../core/models/flight.model';
import { FlightService } from '../../../core/services/flight.service';
import { FlightSearchRequest } from './flight-search-form/flight-search-form.component';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {

  flights: Flight[] = [];
  searched = false;

  constructor(
    private flightService: FlightService
  ) {}

  searchFlights(searchRequest: FlightSearchRequest): void {

    this.flights = this.flightService.searchFlights(
      searchRequest.from,
      searchRequest.to
    );

    this.searched = true;
  }
}