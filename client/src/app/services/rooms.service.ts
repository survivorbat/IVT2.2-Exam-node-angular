import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Room from '../domain/Room';

@Injectable()
export class RoomsService {
  private URL: string = "http://avancinema.herokuapp.com/api/rooms";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]>{
    return this.http.get<Room[]>(this.URL);
  }
  getById(id: String): Observable<Room>{
    return this.http.get<Room>(this.URL+"/"+id);
  }
}
