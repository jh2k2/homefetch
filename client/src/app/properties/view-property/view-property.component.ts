import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Property } from '../../model/property.model';

declare var paypal;

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit, AfterViewInit {
  @ViewChild('paypal') paypalElement: ElementRef;

  public iconURL = ['', "../../../assets/icons/B-wireless-network.png",
    "../../../assets/icons/B-hdtv.png",
    "../../../assets/icons/B-bed.png",
    "../../../assets/icons/B-single-bed.png",

    "../../../assets/icons/B-air-conditioner.png",
    "../../../assets/icons/B-fridge.png",
    "../../../assets/icons/B-stove-oven.png",
    "../../../assets/icons/B-washing-machine.png",

    "../../../assets/icons/B-bathtub.png",
    "../../../assets/icons/B-microwave.png",
    "../../../assets/icons/B-landline.png",
    "../../../assets/icons/B-fireplace.png"
  ];
  public taken;
  public isClicked = [];
  public url;
  public isDataLoaded = false;
  public images = [];
  public pos = 0;
  public property;
  public watcher: string;
  public activ = null;
  public users: User;
  public request;
  public hasrequest;
  public isTenant;
  public amount;

  constructor(private router: Router, private route: ActivatedRoute, private propSer: PropertyService, private userSer: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.taken = params.get('id');
      this.propSer.viewProperty(this.taken).subscribe(
        data => {
          this.amount = data.prop.deposit;
          this.property = data.prop;
          this.property.user = data.user;
          this.isClicked[1] = data.prop.internet,
            this.isClicked[2] = data.prop.cableTV,
            this.isClicked[3] = data.prop.bBed,
            this.isClicked[4] = data.prop.sBed,
            this.isClicked[5] = data.prop.conditioner,
            this.isClicked[6] = data.prop.fridge,
            this.isClicked[7] = data.prop.stove,
            this.isClicked[8] = data.prop.washer,
            this.isClicked[9] = data.prop.bathub,
            this.isClicked[10] = data.prop.microwave,
            this.isClicked[11] = data.prop.landline,
            this.isClicked[12] = data.prop.fireplace,
            this.url = "/uploads/avatars/" + this.property.user.avatar;
          if (this.property.image1 != "no")
            this.images.push(this.propSer.getImateUrl(this.property.image1));
          if (this.property.image2 != "no")
            this.images.push(this.propSer.getImateUrl(this.property.image2));
          if (this.property.image3 != "no")
            this.images.push(this.propSer.getImateUrl(this.property.image3));
          if (this.property.image4 != "no")
            this.images.push(this.propSer.getImateUrl(this.property.image4));
          if (this.images.length == 0)
            this.images.push(this.propSer.getImateUrl("no"));
          this.isDataLoaded = true;
        });
    });

    this.userSer.getSettings().subscribe(
      data => {
        this.users = data.user;
        this.request = data.user.request.includes(this.taken);
        if (data.user.request.length && data.user.request) {
          this.hasrequest = true;
        }
        if (data.user.landlord == 0 || data.user.admin != 0) {
          this.isTenant = true;
        } else {
          this.isTenant = false;
        }
      });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: this.amount
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            this.addRequest();
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.paypalElement.nativeElement);
    }, 1000);
  }

  left() { if (this.pos == 0) { this.pos = this.images.length - 1; } else this.pos = this.pos - 1; }

  right() { if (this.pos == this.images.length - 1) { this.pos = 0; } else this.pos = this.pos + 1; }

  isLoggedIn() {
    if (this.userSer.isLoggedIn()) {
      if (this.activ == null && this.property.user._id != undefined) {
        this.activ = 1;
      }
      if (this.watcher != this.property.user._id) return true;
      else return false;
    } else return false;
  }

  goToProfile() {
    this.router.navigate(['/users/profile/', this.property.user.userName]);
  }

  addRequest() {
    this.users.request.push(this.property._id);
    this.userSer.addRequest(this.users).subscribe();
    this.hasrequest = true;
    this.request = true;
  }


  removeRequest() {
    let index = this.users.request.indexOf(this.taken);
    this.users.request.splice(index, 1);
    this.userSer.addRequest(this.users).subscribe();
    this.hasrequest = false;
    this.request = false;
  }

  isActive(num) { return this.isClicked[num] == true; }

}
