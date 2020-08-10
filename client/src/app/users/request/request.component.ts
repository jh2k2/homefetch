import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Property } from '../../model/property.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public loaded = false;

  constructor(private userSer: UserService, private propSer: PropertyService, private router: Router) { }

  ngOnInit(): void {

    this.userSer.getSettings().subscribe(
      data => {
        if(data.user.landlord == 0 && data.user.admin == 0) {
          this.router.navigate(['/']);
        }

        this.loaded = true;
      });



  }

}
