import { Component, OnInit } from '@angular/core';
import { DestinationDto } from 'src/dtos/DestinationDto';
import { DestinationService } from './destination.service';
import { LoginService } from './login.service';
import { MatchingService } from './matching.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title : string = 'Travel Buddy';
  // Login 
  isLoggedIn : boolean = false;
  isLoggingIn: boolean = false;
  isRegistering: boolean = false;
  username: string = "";
  userId: string = "";

  // Destinations
  isCreating: boolean = false;
  isLoading: boolean = false;
  isDeleting : boolean = false;
  deletingId : string = "";
  destinations: DestinationDto[] = [];

  // Matchings
  matchings: Map<DestinationDto, DestinationDto[]> = new Map<DestinationDto, DestinationDto[]>();

  constructor(private loginService : LoginService, private destinationService : DestinationService, private matchingService : MatchingService) { }

  login(username: string, password: string) { 
    this.isLoggingIn = true;
    this.loginService.login(username, password).subscribe(result => {
      if(result) {
        this.isLoggedIn = true;
        this.username = username;
        this.userId = result.id;
        this.isLoggingIn = false;
        this.loadDestinationsForUser();
      }
      else {
        this.isLoggedIn = false;
        this.username = "";
        this.userId = "";
        this.isLoggingIn = false;
      }
    });
  }

  logout() {
    this.isLoggedIn = true;
    this.isLoggedIn = false;
    this.username = "";
    this.userId = "";
    this.destinations = [];
    this.matchings = new Map<DestinationDto, DestinationDto[]>();
    this.isLoggingIn = false;
  }

  register(username: string, password: string) {
    this.isRegistering = true;
    this.loginService.register(username, password).subscribe(result => {
      this.isRegistering = false;
      this.login(username, password)
    })
  }

  createNewDestination(country: string, region: string, city: string) {
    this.isCreating = true;
    let observable = this.destinationService.postDestination(country, region, city, this.userId)
    observable.subscribe(result => {
      this.isCreating = false;
      this.loadDestinationsForUser();
    });
  }

  loadDestinationsForUser() {
    this.isLoading = true;
    let observable = this.destinationService.getDestinationsForUser(this.userId);
    observable.subscribe(result => {
      this.destinations = result
      this.isLoading = false;
    });
  }

  deleteDestination(destinationId : string) {
    this.isDeleting = true;
    this.deletingId = destinationId;
    let observable = this.destinationService.deleteDestination(destinationId)
    observable.subscribe(result => {
      this.isDeleting = false;
      this.deletingId = "";
      this.loadDestinationsForUser();
    });
  }

  getMatchingsForDestination(destination: DestinationDto) {
    let observable = this.matchingService.getMatchingsForDestination(destination.id)
    observable.subscribe(result => {
      if(result) {
        // distinct
        this.matchings.set(destination, result.matchedDestinations.filter((value, index, self) => self.indexOf(value) === index));
      }
    });
  }

}
