import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit {

    // The form group for the add trip form
    addForm: FormGroup;
    // Flag to check if form is submitted
    submitted = false;

    // Injecting dependencies: FormBuilder, Router, and TripDataService
    constructor(        
        private formBuilder: FormBuilder,
        private router: Router,
        private tripService: TripDataService
    ) { }

    // Initializing the form group with form controls and validators
    ngOnInit() {
        this.addForm = this.formBuilder.group({
            _id: [],
            code: ['', Validators.required],
            name: ['', Validators.required],
            length: ['', Validators.required],
            start: ['', Validators.required],
            resort: ['', Validators.required],
            perPerson: ['', Validators.required],
            image: ['', Validators.required],
            description: ['', Validators.required],
        })
    }

    // Handling form submission
    onSubmit() {
        this.submitted = true;
        // Checking if the form is valid before submitting
        if(this.addForm.valid){
            // Calling the service method to add a trip
            this.tripService.addTrip(this.addForm.value)
            .then(data => {
                console.log(data);
                // Navigating to the list trips page after successful submission
                this.router.navigate(['list-trips']);
            });
        }
    }

    // Getter for easy access to form fields
    get f() { return this.addForm.controls; }
}
