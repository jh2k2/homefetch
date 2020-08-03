import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  public users: User[];
  public status;
  constructor(private adSr: AdminService, private router: Router) { }

  ngOnInit() {
    this.adSr.getUsers().subscribe(data => {
      this.users = data.obj;
      this.status = data.status;
    });
  }

  banUser(user) {
    if (user.banned == true) user.banned = false; else user.banned = true;
    this.adSr.setBan(user).subscribe();
  }
  setAdmin(user, num) {
    if (user.admin == num) user.admin = 0; else user.admin = num;
    this.adSr.setData(user).subscribe();
  }

  showProfile(username) { this.router.navigate(['/users/profile', username]); }

}
