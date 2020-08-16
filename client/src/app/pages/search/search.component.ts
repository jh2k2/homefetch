import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../model/property.model';

declare let google: any;
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('agmMap') agmMap: AgmMap
  
  form: FormGroup;

  //views
  latitude: Number;
  longitude: Number;
  searchProp: Property[];
  properties: Property[];
  toShow: Property[];
  private param;
  public number = [];
  public onNum = 0;
  public biggest;
  public sort = 1;
  isLoaded = false;

  constructor(private propSer: PropertyService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  mapReady() {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.param }, (results, status) => {
      if (status == 'OK') {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
    });
  }

  ngOnInit() {
    document.getElementsByClassName('nav')[0].classList.add('affix');

    this.form = new FormGroup({
      vicinity: new FormControl()
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.param = params.get('param');

      this.propSer.getAllProperties({ params: {} }).subscribe(data => {
        this.searchProp = data.obj;
      });

      if (this.param == null) {
        this.router.navigate(['/']);
      } else {
        this.propSer.getAllProperties({ params: { remain: this.param } }).subscribe(data => {
          this.properties = data.obj;

          this.sortList();
          this.createList();
        });
      }

    });

  }

  //views
  goSearch(data) {
    this.properties.length = 0;
    this.propSer.getAllProperties({ params: { vicinity: data.target.value.toString() } }).subscribe(data => {
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
    this.isLoaded = true;

  }

  onSubmit() {
    this.router.navigate(['/search', this.form.value.vicinity]);
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
