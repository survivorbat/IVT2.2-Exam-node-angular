import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Film from '../domain/Film';

@Injectable()
export class FilmsService {
  private URL: string = "https://avancinema.herokuapp.com/api/films";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Film[]>{
    return this.http.get<Film[]>(this.URL);
  }
  getById(id: String): Observable<Film>{
    return this.http.get<Film>(this.URL+"/"+id);
  }
  delete(id: String) {
    return this.http.delete(this.URL+'/'+id, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
}
