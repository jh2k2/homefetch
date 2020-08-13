import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from "../../model/property.model";
import { UserService } from '../../services/user.service';
import { PropertyService } from '../../services/property.service';


@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.css']
})
export class MyPropertyComponent implements OnInit {
  public propArray: Property[];
  public admin = false;
  public add: Boolean;
  readData = 1;
  public dataLoaded = false;
  constructor(private propSer: PropertyService, private router: Router, private userSer: UserService) { }

  ngOnInit() {
    this.userSer.getSettings().subscribe(
      data => {
        if(data.user.admin!=0) {
          this.admin = true;
        }
        if(data.user.landlord != 1 && data.user.admin == 0) {
          this.router.navigate(['/']);
        }
        this.dataLoaded=true;
      });

    this.propSer.currentMessage.subscribe(message => {
      if (message == 1) {
        this.readData = 1;
        this.getData();
      }
    });
    this.getData();
  }

  getData() {
    if (this.readData == 1) {
      this.readData = 0;
      this.userSer.getProperties().subscribe(data => {
        this.propArray = data.obj;
        if (data.obj.length < 5) {
          this.add = true;
        } else {
          this.add = false;
        }
      });
    }
  }

  deleteProp(prop) {
    if (confirm("Are you sure to delete this property?")) {
      this.propSer.deleteProperty(prop._id).subscribe();
      var index = this.propArray.indexOf(prop);
      if (index > -1) {
        this.propArray.splice(index, 1);
      }
    }
  }

  approveProp(prop) {
    if (prop.approved == 1) {
      return true;
    } else {
      return false;
    }
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

  viewProp(prop) {
    this.router.navigate(['/properties/view', prop._id]);
  }

  editProp(prop) {
    this.router.navigate(['/properties/edit', prop._id]);
  }

  goForNew() {
    this.router.navigate(['/properties/add']);
  }

}
