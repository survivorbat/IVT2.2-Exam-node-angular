import { Component, OnInit, Input } from '@angular/core';
import Ticket from '../../../domain/Ticket';
import Showing from '../../../domain/Showing';
import { ShowingsService } from '../../../services/showingservice.service';

@Component({
  selector: 'app-newticket',
  templateUrl: './newticket.component.html',
  styleUrls: ['./newticket.component.scss']
})
export class NewticketComponent implements OnInit {
  newTicket: Ticket[];
  loading: boolean;
  _showing: Showing;

  @Input() set showing(showing: Showing){
    this._showing = showing;
  }
  constructor(private showingservice: ShowingsService) { this._showing=new Showing()}

  ngOnInit() {
    
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
  submit(){

  }
}
