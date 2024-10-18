import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup; // Declare form group
  trip!: Trip; // Declare trip variable
  submitted = false; // Flag for form submission
  message: string = ''; // Message to display

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form
    this.getTripDetails(); // Fetch the trip details
  }

  initializeForm(): void {
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getTripDetails(): void {
    const tripCode = localStorage.getItem('tripCode'); // Retrieve the trip code
    if (!tripCode) {
      alert("Couldn't find tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: Trip) => {
        this.trip = value;

        // Ensure the start date is a Date object
        if (typeof value.start === 'string') {
          value.start = new Date(value.start); // Convert string to Date object
        }

        // Keep value.start as a Date object
        // Set the value of the form field to the Date object directly
        this.editForm.patchValue({
          ...value,
          start: value.start // Ensure start is of type Date
        });
      },
      error: (error: any) => {
        console.error('Error fetching trip:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: Trip) => {
          console.log(value);
          this.router.navigate(['/trips']); // Redirect to the trip listing page
        },
        error: (error: any) => {
          console.error('Error updating trip:', error);
        }
      });
    }
  }

  // Shortcut to access form controls
  get f() { return this.editForm.controls; }
}
