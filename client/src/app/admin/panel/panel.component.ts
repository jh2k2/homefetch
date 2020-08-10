import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public chouse=1;
  public user;
  public isLoaded = false;

  constructor(private userSer: UserService, private router: Router) { }

  ngOnInit() {
    this.userSer.getSettings().subscribe(
      data => {
        this.user = data.user;

        if(data.user.admin == 0) {
          this.router.navigate(['/']);
        }
        this.isLoaded = true;
      });
  }

  setChoise(num)
  {
    this.chouse=num;
  }

}
