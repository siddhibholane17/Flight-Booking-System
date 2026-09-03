import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface FlightSearchRequest {
  from: string;
  to: string;
}

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent {

  searchForm: FormGroup;

  @Output() search = new EventEmitter<FlightSearchRequest>();

  constructor(private fb: FormBuilder) {
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

    const searchRequest: FlightSearchRequest = {
      from: this.searchForm.value.from.trim(),
      to: this.searchForm.value.to.trim()
    };

    this.search.emit(searchRequest);
  }
}