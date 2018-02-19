import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Ticket from '../domain/Ticket';
import { tick } from '@angular/core/testing';
import User from '../domain/User';

@Injectable()
export class TicketService {
  private URL: string = "https://avancinema.herokuapp.com/api/tickets";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URL, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  getById(id: String): Observable<Ticket>{
    return this.http.get<Ticket>(this.URL+"/"+id, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  getByShowing(showing: String): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URL+"/showing/"+showing, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  getByUser(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.URL+"/user", {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  addOne(ticket: Ticket){
    return this.http.post(this.URL,ticket, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  delete(ticket: String){
    return this.http.delete(this.URL+'/'+ticket, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
}
