import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          )
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
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
    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      const nameControl = this.registerForm.get('name');
      const emailControl = this.registerForm.get('email');
      const phoneControl = this.registerForm.get('phone');
      const passwordControl = this.registerForm.get('password');
      const confirmPasswordControl =
        this.registerForm.get('confirmPassword');

      if (nameControl?.hasError('required')) {
        this.errorMessage = 'Name is required.';
      }
      else if (emailControl?.hasError('required')) {
        this.errorMessage = 'Email is required.';
      }
      else if (emailControl?.hasError('pattern')) {
        this.errorMessage =
          'Please enter a valid email address, for example: abc@gmail.com.';
      }
      else if (phoneControl?.hasError('required')) {
        this.errorMessage = 'Phone number is required.';
      }
      else if (phoneControl?.hasError('pattern')) {
        this.errorMessage =
          'Please enter a valid 10-digit phone number.';
      }
      else if (passwordControl?.hasError('required')) {
        this.errorMessage = 'Password is required.';
      }
      else if (passwordControl?.hasError('minlength')) {
        this.errorMessage =
          'Password must be at least 6 characters.';
      }
      else if (confirmPasswordControl?.hasError('required')) {
        this.errorMessage = 'Please confirm your password.';
      }

      return;
    }

    // Check whether passwords match
    const formValue = this.registerForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Create registration request
    const registerRequest: RegisterRequest = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      password: formValue.password
    };

    // Call AuthService
    this.authService.register(registerRequest).subscribe({
      next: (response) => {

        if (response.success) {
          this.successMessage = 'Registration successful.';
          this.registerForm.reset();
        }
        else {
          this.errorMessage =
            response.message || 'Registration failed. Please try again.';
        }
      },

      error: (error) => {
        console.error('Registration error:', error);

        this.errorMessage =
          'Unable to connect to the server. Please try again later.';
      }
    });
  }
}