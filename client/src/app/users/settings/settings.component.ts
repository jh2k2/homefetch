import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  public url = "";
  public mistake = false;
  fileToUpload: File = null;
  public isDataLoaded = false;
  constructor(private router: Router, private userSer: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userSer.getSettings().subscribe(
      data => {
        this.form = new FormGroup({
          firstName: new FormControl(data.user.name, [Validators.required, Validators.minLength(3)]),
          lastName: new FormControl(data.user.last, [Validators.required, Validators.minLength(3)]),
          userName: new FormControl(data.user.userName, [Validators.required, Validators.minLength(5)]),
          email: new FormControl(data.user.email, [Validators.required, Validators.minLength(5), Validators.email]),
          phone: new FormControl(data.user.phone, [Validators.required, Validators.minLength(5)]),
          street: new FormControl(data.user.street, [Validators.required, Validators.minLength(5)]),
          street2: new FormControl(data.user.street2),
          password: new FormControl(null, [Validators.required, Validators.minLength(8)]),

        });
        this.url = this.userSer.getAvatarURL(data.user.avatar);
        this.isDataLoaded = true;
      });
  }

  onImageAdded(event) {
    var temp = event.target.files[0];
    if (temp != undefined)
      if (temp.type.split('/')[0] != "image") this.mistake = true;
      else {
        this.fileToUpload = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.url = event.target.result;
            this.mistake = false;
          }
          reader.readAsDataURL(event.target.files[0]);
        }
      }

  }

  GoForPassword() { this.router.navigate(['/users/password']); }

  onSubmit() {
    const user = new User(
      this.form.value.email,
      this.form.value.password,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.userName.toLowerCase(),
      this.form.value.phone,
      this.form.value.street,
      this.form.value.street2,
    );
    this.userSer.setSettings(user, this.fileToUpload).subscribe(data => {
      this.userSer.changeMessage(1);
      this.router.navigate(['/users/profile/' + data.user.toString()]);
    });
  }

}
