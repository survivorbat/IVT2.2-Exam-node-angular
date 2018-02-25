import { Component, OnInit } from '@angular/core';
import User from '../../../domain/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _user: User;
  private _formresult: String;
  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.user=new User();
  }


	public get user(): User {
		return this._user;
	}

	public set user(value: User) {
		this._user = value;
	}

	public get formresult(): String {
		return this._formresult;
	}

	public set formresult(value: String) {
		this._formresult = value;
	}
  

  submit(){
    this.userservice.checkUser(this.user).subscribe(res => {
      this.formresult="Succesvol ingelogd!";
      localStorage.setItem('API_TOKEN',res.token);
      localStorage.setItem('loggedin',"true");
      localStorage.setItem('authlevel',res.authlevel);
    }, error => {
      if(error.status===401){
        this.formresult="Deze gegevens zijn niet bij ons bekend, heeft u misschien een typefout gemaakt?";
      } else if(error.status===422){
        this.formresult="Weet u zeker dat u alles heeft ingevuld?";
      } else {
        this.formresult="Er is een fout opgetreden, probeer het alstublieft nog een keer";
      }
    });
  }

}
