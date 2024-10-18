import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api/auth'; // Your backend URL for authentication

  constructor(private http: HttpClient) { }

  // Login method
  public login(user: { email: string, password: string }): Promise<any> {
    return this.http.post<{ token: string }>(`${this.apiBaseUrl}/login`, user)
      .pipe(
        catchError(this.handleError)  // Handle errors from the HTTP request
      )
      .toPromise()
      .then((response: { token: string }) => {
        this.saveToken(response.token);
      });
  }

  // Registration method
  public register(user: { name: string; email: string; password: string }): Promise<any> {
    return this.http.post<{ token: string }>(`${this.apiBaseUrl}/register`, user)
      .pipe(
        catchError(this.handleError)  // Handle errors from the HTTP request
      )
      .toPromise()
      .then((response: { token: string }) => {
        this.saveToken(response.token);
      });
  }

  // Method to check if the user is logged in
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decode the JWT
      return payload.exp > (Date.now() / 1000);  // Check if token is expired
    } else {
      return false;
    }
  }

  // Save token to local storage
  public saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  // Get token from local storage
  public getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  // Logout method to remove token from local storage
  public logout(): void {
    localStorage.removeItem('travlr-token');
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Promise<any> {
    console.error('An error occurred:', error.error.message || error.message);
    return Promise.reject(error.error.message || error.message);
  }
}
