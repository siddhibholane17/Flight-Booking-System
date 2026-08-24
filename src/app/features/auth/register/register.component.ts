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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const registerRequest: RegisterRequest = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      password: formValue.password
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {

        if (response.success) {
          this.successMessage = response.message;
          this.registerForm.reset();
        } else {
          this.errorMessage = response.message;
        }

      },

      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}