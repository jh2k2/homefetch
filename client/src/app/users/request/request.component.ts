import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { User } from '../../model/user.model';
import { Property } from '../../model/property.model';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public loaded = false;
  public isloaded = false;
  public tenant: User;
  public userRequest;
  public owner: User;
  public property;
  public fee;
  public total;
  public noRequest = false;

  constructor(private userSer: UserService, private propSer: PropertyService, private router: Router, private paySer: PaymentService) { }

  ngOnInit(): void {

    this.userSer.getSettings().subscribe(data1 => {
      this.owner = data1.user;
      if (data1.user.userRequest.length > 0) {

        this.userSer.getProfile(data1.user.userRequest[0]).subscribe((data2) => {
          this.tenant = data2.user;

          if (data2.user.request == "none") {
            this.noRequest = true;
            this.loaded = true;
          } else {
            this.propSer.viewProperty(data2.user.request).subscribe(
              data3 => {
                this.property = data3.prop;

                this.fee = data3.prop.monthly * .3;
                this.total = this.fee + data3.prop.deposit;

                this.loaded = true;
              });
          }
        });


      } else {
        this.noRequest = true;
      }

    });


  }

  refund() {
    this.paySer.refundpayment(this.tenant).subscribe();

    this.tenant.paymentId = "none";
    this.tenant.reject = this.tenant.request;
    this.tenant.request = "none";

    for (var i = 0; i < this.owner.userRequest.length; i++) {
      if (this.owner.userRequest[i] == this.tenant.userName) {
        this.owner.userRequest.splice(i, 1);
      }
    }

    this.userSer.setData(this.tenant).subscribe();
    this.userSer.setData(this.owner).subscribe();
    this.router.navigate(['/users/property']);
  }

  accept() {
    this.tenant.accept = this.tenant.request;
    this.tenant.request = "none";


    for (var i = 0; i < this.owner.userRequest.length; i++) {
      if (this.owner.userRequest[i] == this.tenant.userName) {
        this.owner.userRequest.splice(i, 1);
      }
    }
    this.userSer.setData(this.owner).subscribe();
    this.userSer.setData(this.tenant).subscribe();
    this.router.navigate(['/users/property']); i
  }

  getDate(s) {
    var b = s.split(/\D+/);
    var c = new Date(Date.UTC(b[0], --b[1], b[2]));
    var result = c.toString().split(" ");
    return result[1] + " " + result[2] + ", " + result[3];
  }

}
