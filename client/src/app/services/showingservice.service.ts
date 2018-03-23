import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Showing from '../domain/Showing';

@Injectable()
export class ShowingsService {
  private URL: string = "https://avancinemalite.herokuapp.com/api/showings";
  constructor(private http: HttpClient) {}

  getAll(): Observable<Showing[]>{
    return this.http.get<Showing[]>(this.URL);
  }
  getByLocation(location: String): Observable<Showing[]>{
    return this.http.get<Showing[]>(this.URL+"/location/"+location);
  }
  getById(id: String): Observable<Showing>{
    return this.http.get<Showing>(this.URL+"/"+id);
  }
  addOne(showing: Showing){
    return this.http.post(this.URL,showing);
  }
  patch(showing: Showing){
    return this.http.patch(this.URL+'/'+showing._id,showing);
  }
  delete(id: String) {
    return this.http.delete(this.URL+'/'+id);
  }
}
