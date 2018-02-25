import { Component, OnInit } from '@angular/core';
import User from '../../../domain/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {
  private _newUser: User;
  private _formresult: String;
  constructor(private userservice: UserService) { }


	public get newUser(): User {
		return this._newUser;
	}

	public set newUser(value: User) {
		this._newUser = value;
	}

	public get formresult(): String {
		return this._formresult;
	}

	public set formresult(value: String) {
		this._formresult = value;
	}
  

  ngOnInit() {
    this.newUser=new User();
  }
  submit(){
    this.userservice.addUser(this.newUser).subscribe(res => {
      this.formresult="Gelukt! Welkom bij Avancinema. U kunt nu gelijk inloggen.";
    }, error => {
      if(error.status===422){
        this.formresult="Er ging iets mis bij het versturen van dit formulier, heeft u alles goed ingevuld?";
      } else if(error.status===500){
        this.formresult="Er ging iets mis bij onze servers, probeert u het alstublieft nog een keer."
      } else if(error.status===409){
        this.formresult="Er bestaat al een account met dit e-mail adres, bent u uw wachtwoord vergeten?";
      }
    });
  }
}
