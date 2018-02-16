import { Component, OnInit } from '@angular/core';
import User from '../../../domain/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {
  newUser: User;
  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.newUser=new User();
  }
  reset(){
    this.newUser=new User();
  }
  submit(){
    console.log(this.newUser);
    this.userservice.addUser(this.newUser).subscribe((res: any) => {
      console.log(res);
    });
  }
}
