import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Location from '../domain/Location';

@Injectable()
export class LocationsService {
  private URL: string = "https://avancinema.herokuapp.com/api/locations";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Location[]>{
    return this.http.get<Location[]>(this.URL);
  }
  getById(id: String): Observable<Location>{
    return this.http.get<Location>(this.URL+"/"+id);
  }
  delete(id: String) {
    return this.http.delete(this.URL+'/'+id, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
}
