import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: Flight[] = [
    {
      id: 1,
      airline: 'IndiGo',
      flightNumber: '6E-123',
      from: 'Mumbai',
      to: 'Delhi',
      departureTime: '08:00',
      arrivalTime: '10:15',
      duration: '2h 15m',
      price: 4500
    },
    {
      id: 2,
      airline: 'Air India',
      flightNumber: 'AI-456',
      from: 'Mumbai',
      to: 'Delhi',
      departureTime: '12:30',
      arrivalTime: '14:45',
      duration: '2h 15m',
      price: 5200
    },
    {
      id: 3,
      airline: 'IndiGo',
      flightNumber: '6E-789',
      from: 'Delhi',
      to: 'Bangalore',
      departureTime: '09:00',
      arrivalTime: '11:45',
      duration: '2h 45m',
      price: 4800
    }
  ];

  searchFlights(from: string, to: string): Flight[] {
    return this.flights.filter(flight =>
      flight.from.toLowerCase() === from.toLowerCase() &&
      flight.to.toLowerCase() === to.toLowerCase()
    );
  }
}
