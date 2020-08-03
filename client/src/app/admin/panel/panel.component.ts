import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public chouse=1;
  constructor() { }

  ngOnInit() {
  }

  setChoise(num)
  {
    this.chouse=num;
  }

}
