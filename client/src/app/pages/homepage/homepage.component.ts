import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { PropertyService } from "../../services/property.service";
import { Property } from "../../model/property.model";
import $ from "jquery";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: ['height: 100%'],
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  form: FormGroup;

  public properties: Property[];
  public toShow: Property[];
  public number = [];
  public onNum = 0;
  public biggest;
  public sort = 1;
  public isLoaded = false;

  constructor(private router: Router, private propSer: PropertyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      vicinity: new FormControl()
    });

    this.propSer.getAllProperties({ params: {} }).subscribe(data => {
      this.properties = data.obj;

      this.sortNewest();
      this.createList();

      this.isLoaded = true;
    });

    $(window).scroll(function() {
      if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
      } else {
        $('.nav').removeClass('affix');
      }
    });

    $('.navTrigger').click(function() {
      $(this).toggleClass('active');
      $("#mainListDiv").toggleClass("show_list");
      $("#mainListDiv").fadeIn();
    });

    $('.pill-half').click(function() {
      const pill = document.getElementsByClassName('pill-half');
      for (let i = 0; i < pill.length; i++) {
        document.getElementsByClassName('pill-half')[i].classList.remove('active');
      }
      $(this).addClass('active');

      const why = document.getElementsByClassName('why');
      for (let i = 0; i < why.length; i++) {
        document.getElementsByClassName('why')[i].classList.remove('active');
      }
      const id = '#why-' + $(this).attr('id');
      const id_title = '#why-' + $(this).attr('id') + '-title';
      $(id).addClass('active');
      $(id_title).addClass('active');

      const how = document.getElementsByClassName('how-it-works');
      for (let i = 0; i < how.length; i++) {
        document.getElementsByClassName('how-it-works')[i].classList.remove('active');
      }
      const how_id = '#how-' + $(this).attr('id');
      $(how_id).addClass('active');

      const faq = document.getElementsByClassName('faq');
      for (let i = 0; i < faq.length; i++) {
        document.getElementsByClassName('faq')[i].classList.remove('active');
      }
      const faq_id = '#faq-' + $(this).attr('id');
      $(faq_id).addClass('active');

      const call_to_action = document.getElementsByClassName('call-to-action');
      for (let i = 0; i < call_to_action.length; i++) {
        document.getElementsByClassName('call-to-action')[i].classList.remove('active');
      }
      const call_id = '#new-' + $(this).attr('id');
      $(call_id).addClass('active');
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

  sliceon(num) {
    this.onNum = num;
    let prop = this.properties;
    this.toShow = prop.slice(4 * (num - 1), (4 * num));
  }

  onSubmit() {
    this.router.navigate(['/search', this.form.value.vicinity]);
  }


  isActive(num) { return this.onNum == num; }

  OneLeft() { if (this.onNum == 1) return; else this.sliceon(this.onNum - 1); }

  OneRight() { if (this.onNum == this.biggest) return; else this.sliceon(this.onNum + 1); }

  goForProp(prop) { this.router.navigate(['/properties/view', prop._id]); }

}
