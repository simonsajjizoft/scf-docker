import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{
  currentPageData: any;

  constructor(){
  }

  ngOnInit(): void {
  }

  currentPageChange(event: any): void{
    this.currentPageData = event;
  }
}
