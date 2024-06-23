import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
// import { Trip } from 'models/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  // Form group for the edit trip form
  editForm: FormGroup;
  // Flag to check if form is submitted
  submitted = false;

  // Injecting dependencies: Router, FormBuilder, and TripDataService
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService
  ) { }

  // Angular lifecycle hook that is called after the component's view has been fully initialized
  ngOnInit() {
    // Retrieve the trip code from local storage
    let tripCode = localStorage.getItem("tripCode");
    // If trip code is not found, show an alert and navigate to the home page
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    // Log the retrieved trip code to the console
    console.log("EditTripComponent#onInit found tripCode " + tripCode);

    // Initializing the form group with form controls and validators
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });

    // Log the call to getTrip method
    console.log(
      "EditTripComponent#onInit calling TripDataService#getTrip('" +
        tripCode +
        "')"
    );

    // Call the service method to get trip details and handle the promise returned by the method
    this.tripService.getTrip(tripCode)
      .then(data => {
        // Patch the form with the retrieved trip data
        this.editForm.patchValue(data[0]);
        
        console.log("patched");
        // Using editForm.setValue() will throw a console error
      });
  }

  // Handling form submission
  onSubmit() {
    this.submitted = true;

    // Check if the form is valid before submitting
    if(this.editForm.valid){
      // Call the service method to update the trip
      this.tripService.updateTrip(this.editForm.value)
        .then(data => {
            console.log(data);
            // Navigate to the list trips page after successful submission
            this.router.navigate(['list-trips']);
        });
    }
  }

  // Getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

}
