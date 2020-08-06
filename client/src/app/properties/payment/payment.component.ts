import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  private amount: any;
  private fee: any;
  private total;
  private property;
  public users = { name: '', fullname: '', email: '', username: '', admin: 0, landlord: 0 };
  public taken;
  public isDataLoaded = false;

  constructor(private router: Router, private route: ActivatedRoute, private propSer: PropertyService, private userSer: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.taken = params.get('id');
      this.propSer.viewProperty(this.taken).subscribe(
        data => {
          if(data.prop.approved != 1) {
            this.router.navigate(['/']);
          }
          this.amount = data.prop.deposit;
          this.property = data.prop;
          this.property.user = data.user;
          this.fee = this.amount * .3;
          this.total = this.fee + this.amount;

          this.isDataLoaded = true;
        });
    });

    this.userSer.getSettings().subscribe(
      data => {
        this.users.name = data.user.name;
        this.users.fullname = data.user.name + ' ' + data.user.last;
        this.users.email = data.user.email;
        this.users.username = data.user.userName;
        this.users.admin = data.user.admin;
        this.users.landlord = data.user.landlord;

      });

    this.loadStripe();
  }

  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51H5eexCD60PLVDzGszeUoz3G56Mdq0sdEarNrw9YldO0LGsBS6jSXk2xyr2kjHf461kSbk2fLr8ooryiWX0Op1W5003LikPyZB',
      locale: 'auto',
      token: function(token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Rental Fee',
      description: this.property.street + this.property.remain,
      amount: (this.amount * 100) + (this.fee * 100)
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

}
