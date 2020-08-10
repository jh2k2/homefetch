import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private userSer: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = new FormGroup({
      oldpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }
  onSubmit() {
    var data = {
      old: this.form.value.oldpassword,
      new: this.form.value.password,
    };
    this.userSer.changePass(data).subscribe(data => {
      this.toastr.success("Password changed!", '', {
        closeButton: true,
        positionClass: 'toast-bottom-right'
      });
      this.userSer.logout();
      this.router.navigate(['/users/login']);
    });
  }

}
