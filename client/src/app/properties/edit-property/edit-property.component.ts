import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { ToastrService } from 'ngx-toastr';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-edit-property',
  template: `
    <app-property-form *ngIf="loaded" [prop]="property" (event)="sendData($event)"></app-property-form>
  `,
  styles: []
})
export class EditPropertyComponent implements OnInit {
  public taken;
  public property: Property;
  public loaded = false;
  constructor(private propSer: PropertyService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.taken = params.get('id');
      this.propSer.editProperty(this.taken).subscribe(
        data => {
          this.property = data.prop;
          this.loaded = true;

        });
    });
  }

  sendData(data) {
    this.property = data.property;
    var fileToUpload: File[] = data.files;
    this.propSer.saveProperty(this.taken, this.property, fileToUpload[1], fileToUpload[2], fileToUpload[3], fileToUpload[4]).subscribe(data => {

      this.toastr.success('apartment saved', '', {
        closeButton: true,
        positionClass: 'toast-bottom-right'
      });
      this.propSer.changeMessage(1);
      this.router.navigate(['/users/property']);
    });
  }

}
