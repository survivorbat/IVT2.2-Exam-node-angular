import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private ticketservice: TicketService){ }
  
  ngOnInit() {
    this.checkLoggedIn();
  }

  private checkLoggedIn(): void {
    if(window.localStorage.getItem("API_TOKEN")!==null){
      this.ticketservice.getByUser().subscribe(res => {}, err => {localStorage.clear()})
    } else {
      localStorage.clear();
    }
  }

}
