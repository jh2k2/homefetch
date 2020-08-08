import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  message: number;
  public wait = false;
  public users = { name: '', fullname: '', email: '', username: '', admin: 0, landlord: 0 };
  public url = '';

  constructor(private router: Router, private userSer: UserService) { }

  ngOnInit() {
    this.userSer.currentMessage.subscribe(message => {
      this.message = message;
      if (this.message == 1) {
        this.message = 0;
        this.wait = false;
      }
    });
  }


  isLoggedIn() {
    if (this.userSer.isLoggedIn()) {
      if (this.wait == false) {
        this.wait = true;
        this.userSer.getSettings().subscribe(
          data => {
            this.users.name = data.user.name;
            this.users.fullname = data.user.name + ' ' + data.user.last;
            this.users.email = data.user.email;
            this.users.username = data.user.userName;
            this.url = this.userSer.getAvatarURL(data.user.avatar);
            this.users.admin = data.user.admin;
            this.users.landlord = data.user.landlord;
          });
      }
      return true;
    } else {
      return false;
    }
  }

  clearDataOfUser() {
    this.users.name = '';
    this.users.fullname = '';
    this.users.email = '';
    this.users.username = '';
    this.url = this.userSer.getAvatarURL('');
  }

  logOut() {
    this.userSer.logout();
    this.router.navigate(['/users/login']);
    this.wait = false;
    this.clearDataOfUser();
  }

  goToProfile() { this.router.navigate(['/users/profile/', this.users.username]); }
}
