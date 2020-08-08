import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private userSer: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      userName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      street: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      street2: new FormControl(null),
    });
  }


  onSubmit() {
    if (confirm("Are you sure these informations are accurate?")) {
      const user = new User(
        this.form.value.email,
        this.form.value.password,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.userName.toLowerCase(),
        this.form.value.phone,
        this.form.value.street,
        this.form.value.street2
      );
      this.userSer.register(user).subscribe();
      this.toastr.success('Profile successfully created!', '', {
        closeButton: true,
        positionClass: 'toast-bottom-right'
      });
      this.form.reset();
      this.router.navigate(['/users/login']);
    } else {
      return;
    }
  }

}
