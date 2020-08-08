import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { User } from '../../model/user.model';
import { Property } from '../../model/property.model';
import { ToastrService } from 'ngx-toastr';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public stripe = Stripe("pk_test_51H5eexCD60PLVDzGszeUoz3G56Mdq0sdEarNrw9YldO0LGsBS6jSXk2xyr2kjHf461kSbk2fLr8ooryiWX0Op1W5003LikPyZB");
  public elements;
  public style;
  public card;
  public form;

  public name;
  public email;
  public billingAddress;

  private amount: any;
  private fee: any;
  private total;
  private property;
  public users;
  public owner;
  public taken;
  public isDataLoaded = false;
  public hasWaitlist = true;

  constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private paySer: PaymentService, private propSer: PropertyService, private userSer: UserService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.taken = params.get('id');
      this.propSer.viewProperty(this.taken).subscribe(
        data => {

          if (data.prop.approved != 1) {
            this.router.navigate(['/']);
          }

          this.amount = data.prop.deposit;
          this.property = data.prop;
          this.property.user = data.user;
          this.fee = this.amount * .3;
          this.total = this.fee + this.amount;

          this.userSer.getProfile(this.property.user.userName).subscribe(
            data => {
              this.owner = data.user;
              this.owner.userRequest = data.user.userRequest;
              console.log(data.user);
            });

          //payment
          document.querySelector("button").disabled = true;
          this.paySer.createpaymentintent(this.property).subscribe(data => {
            this.elements = this.stripe.elements();
            this.style = {
              base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#32325d"
                }
              },
              invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
              }
            };

            this.card = this.elements.create("card", { style: this.style });

            this.card.mount("#card-element");
            this.card.on("change", function(event) {
              // Disable the Pay button if there are no card details in the Element
              document.querySelector("button").disabled = event.empty;
              document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
            });

            this.form = document.getElementById("payment-form");

            this.name = this.form.querySelector('input[name=name]').value;
            this.email = this.form.querySelector('input[name=email]').value;
            this.billingAddress = {
              line1: this.form.querySelector('input[name=address]').value,
              postal_code: this.form.querySelector('input[name=postal_code]').value,
            };

            this.form.addEventListener("submit", (e) => {
              event.preventDefault();

              this.loading(true);
              this.stripe
                .confirmCardPayment(data.json().clientSecret, {
                  payment_method: {
                    card: this.card,
                  }
                })
                .then((result) => {
                  if (result.error) {
                    // Show error to your customer
                  } else {
                    this.orderComplete(result.paymentIntent.id);
                    // Add to booking request of owner
                    // redirect to thank you
                  }
                });
            });
          })
          //end payment

          this.isDataLoaded = true;
        });
    });


    this.userSer.getSettings().subscribe(
      data => {
        this.users = data.user;
      });

  }

  orderComplete(paymentIntentId) {
    this.loading(false);
    document.querySelector("button").disabled = true;
    this.users.request = this.property._id;
    this.userSer.addRequest(this.users).subscribe();

    this.owner.userRequest.push(this.users.userName);
    //this updates self setting, need to update owner's setting
    //this.userSer.addRequest(this.owner).subscribe();


    this.toastr.success('Request sent!', '', {
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
    this.router.navigate(['/']);
  };

  loading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("button").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("button").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  };
}
