import { Component, OnInit, Input } from '@angular/core';
import User from '../../../domain/User';
import {UserService} from '../../../services/user.service';
import Location from '../../../domain/Location';
import AdminCheck from '../../../domain/interfaces/AdminCheck';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, AdminCheck {
  private _error: boolean;
  private _loading: boolean;
  private _users: User[];

  constructor(private usersservice: UserService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getUsers();
  }

	public get error(): boolean {
		return this._error;
	}

	public set error(value: boolean) {
		this._error = value;
	}

	public get users(): User[] {
		return this._users;
	}

	public set users(value: User[]) {
		this._users = value;
	}

	public get loading(): boolean {
		return this._loading;
	}

	public set loading(value: boolean) {
		this._loading = value;
	}
  

  private getUsers(): void {
    this.usersservice.getAll().subscribe((users: any) => {
      let userList = new Array<User>();
      this.loading=false;
      for(let i=0;i<users.length;i++){
        let user = new User();
        user.email=users[i]._fields[0].properties.email;
        userList.push(user);
      }
      this.users=userList;
    }, error => {this.loading=false;this.error=true});
  }
  isAdmin(): boolean {
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }
}
