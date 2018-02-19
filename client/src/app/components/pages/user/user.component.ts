import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isLoggedIn(){
    if(window.localStorage.getItem('loggedin')==='true'){
      return true;
    }
    return false;
  }
  logout(){
    window.localStorage.clear();
  }
}
