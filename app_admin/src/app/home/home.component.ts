// Importing necessary modules and services from Angular core and the authentication service
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

// Component decorator to define metadata for the HomeComponent
@Component({
  selector: 'app-home', // The selector used to identify the component in a template
  templateUrl: './home.component.html', // The path to the HTML template for the component
  styleUrls: ['./home.component.css'] // The path to the CSS file(s) for the component
})
export class HomeComponent implements OnInit {

  // Injecting the AuthenticationService into the component
  constructor(
    private authService: AuthenticationService
  ) { }

  // Angular lifecycle hook that is called after the component's view has been fully initialized
  ngOnInit() {
  }

  // Public method to check if the user is logged in by calling the authentication service
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
