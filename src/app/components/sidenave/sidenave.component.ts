import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenave',
  templateUrl: './sidenave.component.html',
  styleUrls: ['./sidenave.component.css']
})
export class SidenaveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;
  }
}
