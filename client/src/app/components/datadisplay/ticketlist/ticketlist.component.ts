import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import Ticket from '../../../domain/Ticket';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit {
  private _error: boolean;
  private _loading: boolean;
  private _tickets: Ticket[];

  private _admin: boolean;
  @Input() set admin(e: boolean){
    if(e){
      this._admin=true;
      this.getTickets()
    }
  }

	get admin(): boolean {
		return this._admin;
	}
  
  constructor(private ticketsservice: TicketService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getTickets();
  }

	public get error(): boolean {
		return this._error;
	}

	public set error(value: boolean) {
		this._error = value;
	}

	public get loading(): boolean {
		return this._loading;
	}

	public set loading(value: boolean) {
		this._loading = value;
	}

	public get tickets(): Ticket[] {
		return this._tickets;
	}

	public set tickets(value: Ticket[]) {
		this._tickets = value;
	}


  private getTickets(): void {
    if(!this.admin){
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