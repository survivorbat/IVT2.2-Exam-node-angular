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
  error: boolean;
  loading: boolean;
  users: User[];

  constructor(private usersservice: UserService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.usersservice.getAll().subscribe((users: any) => {
      let userList = new Array<User>();
      this.loading=false;
      for(let i=0;i<users.length;i++){
        let user = new User();
        user.email=users[i]._fields[0].properties.email;
        userList.push(user);
      }
      console.log(userList)
      this.users=userList;
    
    }, error => {this.loading=false;this.error=true});
  }
  isAdmin(): boolean {
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }

  deleteUser(id){
    if(confirm('Weet u zeker dat u deze voorstelling wil verwijderen?')) this.usersservice.delete(id).subscribe(res => {
      this.getUsers();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}
