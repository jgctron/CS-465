import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data.service'; // Import your TripDataService
import { Trip } from '../trip'; // Import Trip interface/model
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Ensure HttpClientModule is imported
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = []; // Initialize trips as an empty array

  // Inject the TripDataService and Router
  constructor(private tripDataService: TripDataService, private router: Router) {}

  // OnInit lifecycle hook to fetch trips when the component is initialized
  ngOnInit(): void {
    // Fetch trips from the backend API
    this.getTrips();
  }

  // Method to fetch trips from the backend API using the service
  getTrips(): void {
    this.tripDataService.getTrips().subscribe(
      (data: Trip[]) => {
        // If backend data is available, ensure perPerson is treated as a number
        this.trips = data.map(trip => ({
          ...trip,
          perPerson: +trip.perPerson // Convert to number if it's not already
        }));
      },
      (error) => {
        console.error('Error fetching trips from the backend', error);
      }
    );
  }

  // Method to delete a trip
  deleteTrip(id: string): void {
    if (id) {
      this.tripDataService.deleteTrip(id).subscribe(
        (response) => {
          console.log('Trip deleted successfully:', response);
          this.getTrips();  // Refresh the trips list after deletion
        },
        (error) => {
          console.error('Error deleting trip:', error);
        }
      );
    }
  }

  // Method to navigate to Add Trip form
  navigateToAddTrip(): void {
    this.router.navigate(['/add-trip']); // Make sure the route to add-trip exists
  }

  // Method to navigate to Edit Trip form
  editTrip(trip: Trip): void {
    if (trip._id) { // Check if _id is defined
      localStorage.setItem('tripCode', trip._id); // Store the trip ID for editing
      this.router.navigate(['/edit-trip']); // Navigate to the edit trip route
    } else {
      console.error('Trip ID is undefined, cannot navigate to edit trip.');
    }
  }
}  
