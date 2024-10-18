import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';  // Import the Trip interface

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiUrl = 'http://localhost:3000/api/trips';  // Your API endpoint

  constructor(private http: HttpClient) { }

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // GET a single trip by ID
  getTrip(id: string): Observable<Trip> {
    const url = `${this.apiUrl}/${id}`;  // Construct the URL to fetch the trip by ID
    return this.http.get<Trip>(url);
  }

  // POST: Add a new trip
  addTrip(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Trip>(this.apiUrl, trip, { headers });
  }

  // PUT: Edit an existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    const url = `${this.apiUrl}/${trip._id}`;  // Use _id for MongoDB
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Trip>(url, trip, { headers });
  }

  // DELETE: Delete a trip
  deleteTrip(id: string): Observable<Trip> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Trip>(url);
  }
}
