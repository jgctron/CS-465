import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';  // Import standalone component
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule for HTTP requests

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TripListingComponent, HttpClientModule],  // Import TripListingComponent and HttpClientModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_admin';
}
