import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component'; // Public component
import { PrivateTripListingComponent } from './private-trip-listing/private-trip-listing.component'; // Private component
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Import the RegisterComponent
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for login
  { path: 'register', component: RegisterComponent }, // Add this route for registration
  { path: 'trips', component: TripListingComponent, canActivate: [AuthGuard] }, // Protected public page
  { path: 'private-trips', component: PrivateTripListingComponent }, // Public private page (no buttons)
  { path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard] }, // Protected add trip route
  { path: 'edit-trip', component: EditTripComponent, canActivate: [AuthGuard] }, // Protected edit trip route
  { path: '', redirectTo: '/private-trips', pathMatch: 'full' } // Default route redirects to the private page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
