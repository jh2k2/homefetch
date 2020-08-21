import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { Contact } from "../../model/contact.model";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private userSer: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      subject: new FormControl(),
      message: new FormControl()
    });

  }

  onSubmit() {

    const contact = new Contact (
      this.form.value.name,
      this.form.value.email,
      this.form.value.subject,
      this.form.value.message
    );

    this.userSer.contact(contact).subscribe(data => {
    });

    this.toastr.success('Contact successfully sent!', '', {
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });

    this.router.navigate('['/']');
  }

}
