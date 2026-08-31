import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Flight } from '../../../core/models/flight.model';
import { FlightService } from '../../../core/services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {

  searchForm: FormGroup;
  flights: Flight[] = [];
  searched = false;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService
  ) {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  searchFlights(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const from = this.searchForm.value.from;
    const to = this.searchForm.value.to;

    this.flights = this.flightService.searchFlights(from, to);
    this.searched = true;
  }
}
