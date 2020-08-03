import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private userSer: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }
  onSubmit() {
    const user = new User(this.form.value.email, this.form.value.password);
    this.userSer.login(user)
      .subscribe(
        data => {
          this.form.reset();
          localStorage.setItem('token', data.token);
          this.toastr.success('Log in successful!', '', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/']);
        });
  }

}
