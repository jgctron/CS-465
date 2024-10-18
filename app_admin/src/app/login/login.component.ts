import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true, // Ensure this is set to true for standalone components
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule] // Include FormsModule and CommonModule here
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  formError: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  login(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Please enter your email and password.';
      return;
    }

    this.authService.login(this.credentials)
      .then(() => {
        this.router.navigate(['/trips']);
      })
      .catch((error: any) => {
        this.formError = error;
      });
  }
}
