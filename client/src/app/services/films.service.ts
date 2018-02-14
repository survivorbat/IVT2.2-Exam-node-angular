import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Film from '../domain/Film';

@Injectable()
export class FilmsService {
  private URL: string = "http://avancinema.herokuapp.com/api/films";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Film[]>{
    return this.http.get<Film[]>(this.URL);
  }
  getById(id: string): Observable<Film>{
    return this.http.get<Film>(this.URL+"/"+id);
  }
}
