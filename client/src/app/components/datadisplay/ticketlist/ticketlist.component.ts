import { Component, OnInit } from '@angular/core';
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

  constructor(private ticketsservice: TicketService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getTickets();
  }
  private getTickets(): void {
    this.ticketsservice.getByUser().subscribe(tickets => {this.tickets=tickets;this.loading=false;console.log(this.tickets)}, error => {this.loading=false;this.error=true});
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
  deleteTicket(id){
    if(confirm('Weet u zeker dat u dit ticket wil verwijderen?')) this.ticketsservice.delete(id).subscribe(res => {
      this.getTickets();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}