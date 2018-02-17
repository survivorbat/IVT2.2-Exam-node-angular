import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import User from '../domain/User';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private URL: string = "http://avancinema.herokuapp.com/api/users";

  addUser(user: User): any {
    return this.http.post(this.URL, user);
  }

  checkUser(user: User): any {
    return this.http.post("http://avancinema.herokuapp.com/api/token", user);
  }
}
