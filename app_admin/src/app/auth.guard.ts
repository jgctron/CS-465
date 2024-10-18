import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';  // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;  // If the user is logged in, allow access to the route
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;  // Block access to the route
    }
  }
}
