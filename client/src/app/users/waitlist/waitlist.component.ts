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
  public reject: Property;
  public accept: Property;
  public users: User;
  public usersRequest: string;
  public loaded = false;
  public haveReject = false;
  public haveAccept = false;
  public fee;
  public total;
  public owner;

  constructor(private propSer: PropertyService, private router: Router, private userSer: UserService) { }

  ngOnInit() {
    this.userSer.getSettings().subscribe(
      data => {
        this.users = data.user;
        if (data.user.landlord == 1) {
          this.router.navigate(['/']);
        }

        this.usersRequest = data.user.request;
        if (data.user.request == "none") {
          if (data.user.reject != "none" && data.user.reject != undefined) {
            this.propSer.getAllPropertiesById({ params: { id: data.user.reject } }).subscribe(
              data => {

                this.prop = data.obj;
                this.fee = data.obj.deposit * .3;
                this.total = this.fee + data.obj.deposit;
                this.haveReject = true;

                this.loaded = true;

              });
          } else if (data.user.accept != "none" && data.user.accept != undefined) {
            this.propSer.getAllPropertiesById({ params: { id: data.user.accept } }).subscribe(
              data => {

                this.prop = data.obj;
                this.fee = data.obj.deposit * .3;
                this.total = this.fee + data.obj.deposit;
                this.haveAccept = true;

                this.loaded = true;
              });
          } else {
            this.haveWaitlist = false;
          }

        } else {
          this.propSer.getAllPropertiesById({ params: { id: data.user.request } }).subscribe(
            data => {

              this.prop = data.obj;
              this.fee = data.obj.deposit * .3;
              this.total = this.fee + data.obj.deposit;
              this.haveWaitlist = true;

              this.loaded = true;
            });

        }

        if (data.user.landlord == 1) {
          this.router.navigate(['/']);
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

  getDate(s) {
    var b = s.split(/\D+/);
    var c = new Date(Date.UTC(b[0], --b[1], b[2]));
    var result = c.toString().split(" ");
    return result[1] + " " + result[2] + ", " + result[3];
  }



}
