import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  public properties: Property[];
  public property: Property;
  public taken;
  public loaded = false;
  constructor(private adSr: AdminService, private router: Router) { }

  ngOnInit() {
    this.adSr.getProperties().subscribe(data => {
      this.properties = data.obj;
    });
  }

  showProperty(prop) { this.router.navigate(['/properties/view', prop._id]); }

  deleteProp(prop) {
    this.adSr.deleteProp(prop).subscribe();
    var index = this.properties.indexOf(prop);
    if (index > -1) {
      this.properties.splice(index, 1);
    }
  }

  approveProp(prop, num) {
    if(num == 1) {
      prop.approved = 1;
    } else {
      prop.approved = 0;
    }

    this.adSr.approveProp(prop).subscribe();
  }

}
