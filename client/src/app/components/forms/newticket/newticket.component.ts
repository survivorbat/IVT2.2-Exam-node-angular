import { Component, OnInit, Input } from '@angular/core';
import Ticket from '../../../domain/Ticket';
import Showing from '../../../domain/Showing';
import { ShowingsService } from '../../../services/showingservice.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-newticket',
  templateUrl: './newticket.component.html',
  styleUrls: ['./newticket.component.scss']
})
export class NewticketComponent implements OnInit {
  newTickets: String[];
  takenSeats: String[];
  amountOfTickets: number;
  errorField: string;
  loading: boolean;
  _showing: Showing;
  shown=true;

  @Input() set showing(showing: Showing){
    this._showing = showing;
    this.getTickets();
  }
  constructor(private ticketservice: TicketService) {this.newTickets=[]; this.amountOfTickets=1; this.takenSeats=[]}

  ngOnInit() {
    
  }

  private getTickets(){
    this.ticketservice.getByShowing(this._showing._id).subscribe(res => {
      this.takenSeats = new Array<String>();
      for(let ticket of res){
        this.takenSeats.push(ticket.row+'|'+ticket.column);
      }
    }, error => {
      
    })
  }
  checkSeat(e){
    if(this.takenSeats.indexOf(e)<0){
      return false;
    }
    return true;
  }
  isLoggedIn(){
    if(window.localStorage.getItem('loggedin')==='true'){
      return true;
    }
    return false;
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(i);
    }
    return rs;
  }
  checkboxClicked(e,f){
    if(f.target.checked){
      this.newTickets.push(e);
    } else {
      this.newTickets.splice(this.newTickets.indexOf(e),1);
    }
  }
  submit(){
    if(this.newTickets.length>this.amountOfTickets){
      this.errorField="U heeft meer stoelen aangekruisd dan de hoeveelheid tickets die u wilt bestellen.";
    } else if(this.newTickets.length<this.amountOfTickets){
      this.errorField="U kunt nog "+(this.newTickets.length-this.amountOfTickets)+" stoelen selecteren.";
    } else if(this.newTickets.length===this.amountOfTickets){
      let counter = 0;
      for(let loc of this.newTickets){
        const location = loc.split('|');
        let newTicket = new Ticket();
        newTicket.column=parseInt(location[1]);
        newTicket.row=parseInt(location[0]);
        newTicket.showing=this._showing;
        this.ticketservice.addOne(newTicket).subscribe(res => {
          if(++counter===this.amountOfTickets){
            alert('Succesvol '+this.amountOfTickets+' tickets besteld voor '+this._showing.film.title+'!');
            this.shown=false;
          }
        }, error => {
          if(error.status===422){
            this.errorField="Er ging iets mis bij het versturen van dit formulier, heeft u alles goed ingevuld?";
          } else {
            this.errorField="Er ging iets mis bij onze servers, probeert u het alstublieft nog een keer."
          }
        });
      }
    } else {
      this.errorField="Er ging iets mis in het formulier, weet u zeker dat u alles goed heeft ingevuld?";
    }
  }
}
