import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import User from '../domain/User';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private URL: string = "https://avancinema.herokuapp.com/api/users";

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.URL, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }

  addUser(user: User): any {
    return this.http.post(this.URL, user);
  }

  checkUser(user: User): any {
    return this.http.post("https://avancinema.herokuapp.com/api/token", user);
  }
  delete(id: String) {
    return this.http.delete(this.URL+'/'+id, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
}
