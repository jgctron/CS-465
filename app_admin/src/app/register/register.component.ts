import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthenticationService } from '../services/authentication.service'; // Ensure correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add CommonModule and FormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  formError: string | null = null; // To show form error messages

  constructor(private authService: AuthenticationService, private router: Router) {}

  // Method to handle registration
  onRegisterSubmit(): void {
    this.authService.register(this.credentials).then(() => {
      // Registration successful, navigate to the private trips page or login
      this.router.navigate(['/private-trips']);
    }).catch(error => {
      this.formError = error; // Set form error message if registration fails
    });
  }
}
