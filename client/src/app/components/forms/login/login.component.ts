import { Component, OnInit } from '@angular/core';
import User from '../../../domain/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor() { }

  ngOnInit() {
  }

  submit(){
    
  }

}
