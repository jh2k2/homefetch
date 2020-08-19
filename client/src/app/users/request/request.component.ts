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
  public noRequest = false;

  constructor(private userSer: UserService, private propSer: PropertyService, private router: Router, private paySer: PaymentService) { }

  ngOnInit(): void {

    this.userSer.getSettings().subscribe(data => {
      this.owner = data.user;
      if (data.user.userRequest.length > 0) {
        this.userSer.getProfile(data.user.userRequest[0]).subscribe((data) => {
          this.tenant = data.user;
        });
      } else {
        this.noRequest = true;
      }

      this.loaded = true;
    });


  }

  refund() {
    this.paySer.refundpayment(this.tenant).subscribe();

    this.tenant.paymentId = "none";
    this.tenant.reject = this.tenant.request;
    this.tenant.request = "none";
    console.log(this.tenant);

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
    this.router.navigate(['/users/property']);i
  }

}
