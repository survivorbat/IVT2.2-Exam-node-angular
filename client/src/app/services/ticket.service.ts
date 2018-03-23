import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Ticket from '../domain/Ticket';
import { tick } from '@angular/core/testing';

@Injectable()
export class TicketService {
  private URL: string = "https://avancinemalite.herokuapp.com/api/tickets";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URL);
  }
  getById(id: String): Observable<Ticket>{
    return this.http.get<Ticket>(this.URL+"/"+id);
  }
  getByShowing(showing: String): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URL+"/showing/"+showing);
  }
  getByUser(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URL+"/user");
  }
  addOne(ticket: Ticket){
    return this.http.post(this.URL,ticket);
  }
  patch(ticket: Ticket){
    return this.http.patch(this.URL+'/'+ticket._id,ticket);
  }
  delete(ticket: String){
    return this.http.delete(this.URL+'/'+ticket);
  }
}
