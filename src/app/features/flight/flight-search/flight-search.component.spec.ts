import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../../../core/services/flight.service';

@Component({
  selector: 'app-flight-search-form',
  template: ''
})
class MockFlightSearchFormComponent {}

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let flightService: jasmine.SpyObj<FlightService>;

  beforeEach(async () => {

    flightService = jasmine.createSpyObj(
      'FlightService',
      ['searchFlights']
    );

    await TestBed.configureTestingModule({
      declarations: [
        FlightSearchComponent,
        MockFlightSearchFormComponent
      ],
      providers: [
        {
          provide: FlightService,
          useValue: flightService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search flights using the flight service', () => {

    const mockFlights: any[] = [
      {
        airline: 'IndiGo',
        flightNumber: '6E101',
        from: 'Pune',
        to: 'Delhi',
        departureTime: '10:00',
        arrivalTime: '12:00',
        duration: '2h',
        price: 5000
      }
    ];

    flightService.searchFlights.and.returnValue(mockFlights);

    component.searchFlights({
      from: 'Pune',
      to: 'Delhi'
    });

    expect(
      flightService.searchFlights
    ).toHaveBeenCalledWith('Pune', 'Delhi');

    expect(component.flights).toEqual(mockFlights);
    expect(component.searched).toBeTrue();
  });

  it('should mark search as completed after receiving results', () => {

    flightService.searchFlights.and.returnValue([]);

    component.searchFlights({
      from: 'Pune',
      to: 'Mumbai'
    });

    expect(component.searched).toBeTrue();
    expect(component.flights).toEqual([]);
  });
});