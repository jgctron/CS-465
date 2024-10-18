import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-private-trip-listing',
  templateUrl: './private-trip-listing.component.html',
  styleUrls: ['./private-trip-listing.component.css'],
  standalone: true,
  imports: [CommonModule]  // Add CommonModule here
})
export class PrivateTripListingComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripDataService: TripDataService, private router: Router) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripDataService.getTrips().subscribe(
      (data: Trip[]) => {
        this.trips = data;
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
