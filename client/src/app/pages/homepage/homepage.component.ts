import { Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { PropertyService } from "../../services/property.service";
import { Property } from "../../model/property.model";

import { } from '@types/googlemaps';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: ['height: 100%'],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  autocompleteInput: string;
  queryWait: boolean;

  public properties: Property[];
  public toShow: Property[];
  public number = [];
  public onNum = 0;
  public biggest;
  public sort = 1;

  constructor(private router: Router, private propSer: PropertyService) { }

  ngOnInit() {
    this.propSer.getAllProperties({ params: {} }).subscribe(data => {
      this.properties = data.obj;

      this.sortNewest();
      this.createList();
    });

  }

  getImage(prop) {
    var urlToImg;
    if (prop.image1 != "no") urlToImg = prop.image1;
    else if (prop.image2 != "no") urlToImg = prop.image2;
    else if (prop.image3 != "no") urlToImg = prop.image3;
    else if (prop.image4 != "no") urlToImg = prop.image4;
    else urlToImg = "no";
    return this.propSer.getImateUrl(urlToImg);
  }

  createList() {
    let prop = this.properties;
    this.toShow = prop.slice(0, 4);
    this.biggest = Math.ceil(this.properties.length / 4);
    this.onNum = 1;
    this.number.length = 0;
    for (var i = 1; i <= this.biggest; i++) {
      this.number.push(i);
    }
  }

  sortNewest() {
    this.properties = this.properties.sort((obj1, obj2) => {
      var d1 = new Date(obj1.date);
      var d2 = new Date(obj2.date);
      if (d1.getTime() > d2.getTime()) return -1;
      if (d1.getTime() < d2.getTime()) return 1;
      return 0;
    });
  }

  // MAP
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: [this.addressType]
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
  // MAP
  sliceon(num) {
    this.onNum = num;
    let prop = this.properties;
    this.toShow = prop.slice(4 * (num - 1), (4 * num));
  }

  isActive(num) { return this.onNum == num; }

  OneLeft() { if (this.onNum == 1) return; else this.sliceon(this.onNum - 1); }

  OneRight() { if (this.onNum == this.biggest) return; else this.sliceon(this.onNum + 1); }

  goForProp(prop) { this.router.navigate(['/properties/view', prop._id]); }

  onSubmit(term) {
    console.log(term);
    this.router.navigate(['/search', term.target.value.toString()]);
  }

}
