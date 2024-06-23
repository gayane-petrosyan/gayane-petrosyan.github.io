// Importing necessary modules and services from Angular core, router, and application services
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { trips } from '../data/trips'; // Example import for static data (commented out)
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../../../models/trip';
import { AuthenticationService } from '../services/authentication.service';

// Component decorator to define metadata for the TripListingComponent
@Component({
  selector: 'app-trip-listing', // The selector used to identify the component in a template
  templateUrl: './trip-listing.component.html', // The path to the HTML template for the component
  styleUrls: ['./trip-listing.component.css'], // The path to the CSS file(s) for the component
  providers: [TripDataService] // Providing the TripDataService at the component level
})
export class TripListingComponent implements OnInit {
      
  // Array to hold the trips data, initialized from a service instead of static data
  trips: Trip[];

  // Message to display status or errors
  message: string;
  
  // Injecting the necessary services into the component
  constructor(
    private tripDataService: TripDataService,
    private authService: AuthenticationService,
    private router: Router
  ) { }
  
  // Private method to navigate to the add trip page
  private addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Private method to fetch the trips from the TripDataService
  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips'; // Setting the initial message
    this.tripDataService
      .getTrips()
        .then(foundTrips => {
          // Updating the message and trips array based on the result
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          this.trips = foundTrips;
        });
  }

  // Public method to check if the user is logged in by calling the authentication service
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Angular lifecycle hook that is called after the component's view has been fully initialized
  ngOnInit(): void {
    this.getTrips(); // Fetching the trips when the component initializes
  }
}
