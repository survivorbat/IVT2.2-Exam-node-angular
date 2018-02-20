import { Component, OnInit } from '@angular/core';
import Film from '../../../domain/Film';
import AdminCheck from '../../../domain/interfaces/AdminCheck';
import { FilmsService } from '../../../services/films.service';

@Component({
  selector: 'app-newfilm',
  templateUrl: './newfilm.component.html',
  styleUrls: ['./newfilm.component.scss']
})
export class NewfilmComponent implements OnInit {
  film: Film;
  errorfield: String;
  constructor(private filmservice: FilmsService) {this.film=new Film()}

  ngOnInit() {
  }

  submit(){
    this.filmservice.addOne(this.film).subscribe(res => {
      this.errorfield="Succesvol toegevoegd!";
    }, error => {
      console.log(error);
      if(error.status===422){
        this.errorfield="Er ging iets mis bij het versturen van dit formulier, heeft u alles goed ingevuld?";
      } else if(error.status===500){
        this.errorfield="Er ging iets mis bij onze servers, probeert u het alstublieft nog een keer."
      } else if(error.status===409){
        this.errorfield="Er bestaat al een account met dit e-mail adres, bent u uw wachtwoord vergeten?";
      }
    });
  }
}
