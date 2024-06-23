import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from 'models/trip';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  // Injecting dependencies: Router and TripDataService
  constructor(
    private router: Router,
    private tripService: TripDataService
  ) { }

  // Angular lifecycle hook that is called after the component's view has been fully initialized
  ngOnInit() {
    // Retrieve the trip code from local storage
    let tripCode = localStorage.getItem("tripCode");
    // If trip code is not found, show an alert and navigate to the home page
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed the tripCode!");
      this.router.navigate(['']);
      return;
    }

    // Log the retrieved trip code to the console
    console.log("DeleteTripComponent found tripCode " + tripCode);

    // Call the service method to delete the trip and handle the promise returned by the method
    this.tripService.deleteTrip(tripCode)
      .then(data => {
        // Log the response data to the console
        console.log(data);
        // Navigate to the list trips page after successful deletion
        this.router.navigate(['list-trips']);
      });
  }
}
