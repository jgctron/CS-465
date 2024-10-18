import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // <-- Add NgForm to handle form reset
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data.service';  // Your service
import { Trip } from '../trip';  // Import the Trip interface
import { Router } from '@angular/router';  // <-- Import Router

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- Add FormsModule to imports
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  newTrip: Trip = {
    code: '',  // <-- Add the missing 'code' property
    name: '',
    resort: '',
    length: 0,
    perPerson: 0,
    image: '',
    description: '',
    start: new Date()
  };

  constructor(private tripDataService: TripDataService, private router: Router) {}  // <-- Inject Router

  onSubmit(tripForm: NgForm) {  // <-- Add tripForm as a parameter
    this.tripDataService.addTrip(this.newTrip).subscribe(
      (response) => {
        console.log('Trip added successfully:', response);
        tripForm.resetForm();  // <-- Reset the form after successful submission
        this.router.navigate(['/trips']);  // <-- Navigate to the trip listing page
      },
      (error) => {
        console.error('Error adding trip:', error);
      }
    );
  }
}
