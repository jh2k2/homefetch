import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.css']
})
export class WaitlistComponent implements OnInit {
  public haveWaitlist;
  public prop: Property;
  public users: User;
  public usersRequest: string;
  constructor(private propSer: PropertyService, private router: Router, private userSer: UserService) { }

  ngOnInit() {
    this.userSer.getSettings().subscribe(
      data => {
        this.usersRequest = data.user.request;
        if (this.usersRequest == "none") {
          this.haveWaitlist = false;
        } else {
          this.propSer.getAllPropertiesById({ params: { id: this.usersRequest } }).subscribe(
            data => {
              this.prop = data.obj;
              this.haveWaitlist = true;
            }
          );
        }
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

  viewProp(prop) {
    this.router.navigate(['/properties/view', prop._id]);
  }



}
