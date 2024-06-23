// Importing necessary modules and services from Angular core and router
import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Trip } from 'models/trip';
import { AuthenticationService } from '../services/authentication.service';

// Component decorator to define metadata for the TripCardComponent
@Component({
  selector: 'app-trip-card', // The selector used to identify the component in a template
  templateUrl: './trip-card.component.html', // The path to the HTML template for the component
  styleUrls: ['./trip-card.component.css'] // The path to the CSS file(s) for the component
})
export class TripCardComponent implements OnInit {

  // Input property to receive the trip data from the parent component
  @Input('trip') trip: Trip;

  // Injecting the Router and AuthenticationService into the component
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  // Angular lifecycle hook that is called after the component's view has been fully initialized
  ngOnInit() {
  }

  // Public method to check if the user is logged in by calling the authentication service
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Private method to handle editing a trip
  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode"); // Remove any existing trip code from local storage
    localStorage.setItem("tripCode", trip.code); // Store the current trip code in local storage
    this.router.navigate(['edit-trip']); // Navigate to the edit trip page
  }

  // Private method to handle deleting a trip
  private deleteTrip(trip: Trip): void {
    localStorage.removeItem("tripCode"); // Remove any existing trip code from local storage
    localStorage.setItem("tripCode", trip.code); // Store the current trip code in local storage
    this.router.navigate(['delete-trip']); // Navigate to the delete trip page
  }

}
