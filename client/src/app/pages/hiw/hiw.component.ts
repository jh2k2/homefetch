import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-hiw',
  templateUrl: './hiw.component.html',
  styleUrls: ['./hiw.component.css']
})
export class HiwComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
