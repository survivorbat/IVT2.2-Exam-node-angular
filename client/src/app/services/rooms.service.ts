import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Room from '../domain/Room';

@Injectable()
export class RoomsService {
  private URL: string = "https://avancinema.herokuapp.com/api/rooms";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]>{
    return this.http.get<Room[]>(this.URL);
  }
  getByLocation(location: String): Observable<Room[]>{
    return this.http.get<Room[]>(this.URL+"/location/"+location);
  }
  getById(id: String): Observable<Room>{
    return this.http.get<Room>(this.URL+"/"+id);
  }
  delete(id: String) {
    return this.http.delete(this.URL+'/'+id, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
}
