import { Component, OnInit } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  constructor() { }

  ngOnInit(): void {
  }

  onAutocompleteSelected(result: PlaceResult) {
  }

  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }


}
