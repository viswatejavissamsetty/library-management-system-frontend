import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  selectedTab = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeSelectedTab(tab: number){
    this.selectedTab = tab;
  }

}
