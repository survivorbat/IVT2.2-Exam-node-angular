import { Component, OnInit } from '@angular/core';
import AdminCheck from '../../domain/interfaces/AdminCheck';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AdminCheck {

  constructor() { }

  ngOnInit() {
  }
  isAdmin(): boolean{
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }
  isLoggedIn(): boolean{
    return window.localStorage.getItem('loggedin')==="true";
  }
  logout(){
    window.localStorage.clear();
  }
}
