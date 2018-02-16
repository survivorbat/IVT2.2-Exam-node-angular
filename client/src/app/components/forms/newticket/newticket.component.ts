import { Component, OnInit } from '@angular/core';
import Ticket from '../../../domain/Ticket';

@Component({
  selector: 'app-newticket',
  templateUrl: './newticket.component.html',
  styleUrls: ['./newticket.component.scss']
})
export class NewticketComponent implements OnInit {
  newTicket: Ticket;
  loading: boolean;
  
  constructor() { }

  ngOnInit() {
  }
  isLoggedIn(){
    if(window.localStorage.getItem('loggedin')==='true'){
      return true;
    }
    return false;
  }
}
