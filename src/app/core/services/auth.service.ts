import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Mock Login
  login(request: LoginRequest): Observable<LoginResponse> {

    console.log('Login request:', request);

    const response: LoginResponse = {
      success: true,
      message: 'Login successful',
      user: {
        userId: 1,
        name: 'Siddhi',
        email: request.email,
        role: 'PASSENGER'
      }
    };

    return of(response);
  }

  // Mock Registration
  register(request: RegisterRequest): Observable<LoginResponse> {

    console.log('Register request:', request);

    const newUser: User = {
      userId: 2,
      name: request.name,
      email: request.email,
      role: 'PASSENGER'
    };

    const response: LoginResponse = {
      success: true,
      message: 'Registration successful',
      user: newUser
    };

    return of(response);
  }
}