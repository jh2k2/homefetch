import { Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from 'googlemaps';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //maps
  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  autocompleteInput: string;
  queryWait: boolean;

  //views
  properties: Property[];
  toShow: Property[];
  private param;
  public number = [];
  public onNum = 0;
  public biggest;
  public sort = 1;

  constructor(private propSer: PropertyService, private router: Router, private route: ActivatedRoute) { }

  //maps
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.param = params.get('param');

    });

    if (this.param == null) {
      this.propSer.getAllProperties({ params: {} }).subscribe(data => {
        this.properties = data.obj;

        this.sortList();
        this.createList();
      });
    } else {
      console.log(this.param);
      this.propSer.getAllProperties({ params: { street: this.param } }).subscribe(data => {
        this.properties = data.obj;

        this.sortList();
        this.createList();
      });
    }
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: [this.addressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  //views
  goSearch(data) {
    this.properties.length = 0;
    this.propSer.getAllProperties({ params: { street: data.target.value.toString() } }).subscribe(data => {
      this.properties = data.obj;

      this.sortList();
      this.createList();
    });
  }

  sliceon(num) {
    this.onNum = num;
    let prop = this.properties;
    this.toShow = prop.slice(9 * (num - 1), (9 * num));
  }

  isThereAList() { return this.number.length != 0; }

  isActive(num) { return this.onNum == num; }

  OneLeft() { if (this.onNum == 1) return; else this.sliceon(this.onNum - 1); }

  OneRight() { if (this.onNum == this.biggest) return; else this.sliceon(this.onNum + 1); }

  createList() {
    if (this.properties.length > 9) {
      let prop = this.properties;
      this.toShow = prop.slice(0, 9);
      this.biggest = Math.ceil(this.properties.length / 9);
      this.onNum = 1;
      this.number.length = 0;
      for (var i = 1; i <= this.biggest; i++) {
        this.number.push(i);
      }
    }
    else {
      this.onNum = 0;
      this.toShow = this.properties;
      this.number.length = 0;
    }

  }


  goForProp(prop) { this.router.navigate(['/properties/view', prop._id]); }

  sorting(data) {
    if (data.target.value == "Date - newest") this.sort = 1;
    else if (data.target.value == "Date - oldest") this.sort = 2;
    else if (data.target.value == "Price - low to high") this.sort = 3;
    else if (data.target.value == "Price - high to low") this.sort = 4;
    else this.sort = 1;
    this.sortList();
    this.createList();
  }

  sortList() {
    if (this.sort == 1)
      this.properties = this.properties.sort((obj1, obj2) => {
        var d1 = new Date(obj1.date); var d2 = new Date(obj2.date);
        if (d1.getTime() > d2.getTime()) return -1;
        if (d1.getTime() < d2.getTime()) return 1;
        return 0;
      });
    if (this.sort == 2)
      this.properties = this.properties.sort((obj1, obj2) => {
        var d1 = new Date(obj1.date); var d2 = new Date(obj2.date);
        if (d1.getTime() > d2.getTime()) return 1;
        if (d1.getTime() < d2.getTime()) return -1;
        return 0;
      });
    if (this.sort == 3)
      this.properties = this.properties.sort((obj1, obj2) => {
        if (obj1.deposit > obj2.deposit) return 1;
        if (obj1.deposit < obj2.deposit) return -1;
        return 0;
      });
    if (this.sort == 4)
      this.properties = this.properties.sort((obj1, obj2) => {
        if (obj1.deposit > obj2.deposit) return -1;
        if (obj1.deposit < obj2.deposit) return 1;
        return 0;
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

}
