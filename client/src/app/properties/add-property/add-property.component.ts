import { Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  template: `
  <app-property-form (event)="sendData($event)"></app-property-form>
  `,
  styles: ['']
})
export class AddPropertyComponent implements OnInit {

  constructor(private propSer: PropertyService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() { }

  sendData(data) {
    const property = data.property;
    var fileToUpload: File[] = data.files;

    this.propSer.addProperty(property, fileToUpload[1], fileToUpload[2], fileToUpload[3], fileToUpload[4], fileToUpload[5]).subscribe(data => {
      this.toastr.success('apartment created', '', {
        closeButton: true,
        positionClass: 'toast-bottom-right'
      });
      this.propSer.changeMessage(1);
      this.router.navigate(['/users/property']);
    });
  }

}
