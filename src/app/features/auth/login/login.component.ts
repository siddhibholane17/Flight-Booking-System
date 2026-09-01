import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          )
        ]
      ],
      password: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  onSubmit(): void {

    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');

      if (emailControl?.hasError('required')) {
        this.errorMessage = 'Email is required.';
      } 
      else if (emailControl?.hasError('pattern')) {
        this.errorMessage = 'Please enter a valid email address.';
      } 
      else if (passwordControl?.hasError('required')) {
        this.errorMessage = 'Password is required.';
      }

      return;
    }

    // Create login request
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Call AuthService
    this.authService.login(loginRequest).subscribe({
      
      next: (response) => {

        if (response.success) {

          this.successMessage = 'Login successful.';

          console.log('Logged in user:', response.user);

        } else {

          this.errorMessage =
            response.message || 'Invalid email or password.';
        }
      },

      error: (error) => {

        console.error('Login error:', error);

        this.errorMessage =
          'Unable to connect to the server. Please try again later.';
      }
    });
  }
}