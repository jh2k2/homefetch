import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public taken;
  public url;
  public star = 0;
  public users: User;
  public me = null;
  public isDataLoaded = false;
  constructor(private router: Router, private route: ActivatedRoute, private userSer: UserService) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.taken = params.get('username');
      this.userSer.getProfile(this.taken).subscribe(
        data => {
          this.users = data.user;
          this.me = data.me;
          this.url = this.userSer.getAvatarURL(this.users.avatar);
          if (this.users.street2 == null) this.users.street2 = 'none';
          this.isDataLoaded = true;
        });
    });

  }
  itIsMe() { return this.users.userName == this.me; }

  settings() { this.router.navigate(['/users/settings']); }

}
