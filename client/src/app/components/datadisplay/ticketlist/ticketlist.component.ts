import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import Ticket from '../../../domain/Ticket';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit {
  error: boolean;
  loading: boolean;
  tickets: Ticket[];

  _admin: boolean;
  @Input() set admin(e: boolean){
    if(e){
      this._admin=true;
      this.getTickets()
    }
  }
  constructor(private ticketsservice: TicketService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getTickets();
  }
  private getTickets(): void {
    if(!this._admin){
      this.ticketsservice.getByUser().subscribe(tickets => {this.tickets=tickets;this.loading=false;console.log(this.tickets)}, error => {this.loading=false;this.error=true});
    } else {
      this.ticketsservice.getAll().subscribe(tickets => {this.tickets=tickets;this.loading=false;console.log(this.tickets)}, error => {this.loading=false;this.error=true});
    }
  }
  
  deleteTicket(id){
    if(confirm('Weet u zeker dat u dit ticket wil verwijderen?')) this.ticketsservice.delete(id).subscribe(res => {
      this.getTickets();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}