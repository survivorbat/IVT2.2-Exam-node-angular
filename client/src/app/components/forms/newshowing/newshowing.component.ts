import { Component, OnInit } from '@angular/core';
import Showing from '../../../domain/Showing';
import { ShowingsService } from '../../../services/showingservice.service';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import { FilmsService } from '../../../services/films.service';
import Film from '../../../domain/Film';

@Component({
  selector: 'app-newshowing',
  templateUrl: './newshowing.component.html',
  styleUrls: ['./newshowing.component.scss']
})
export class NewshowingComponent implements OnInit {
  showing: Showing;
  rooms: Room[];
  films: Film[];
  errorfield: String;
  constructor(private showingservice: ShowingsService, private roomservice: RoomsService, private filmservice: FilmsService) {this.showing=new Showing()}

  ngOnInit() {
    this.getRooms();
    this.getFilms();
  }

  getRooms(){
    this.roomservice.getAll().subscribe(res => {
      this.rooms=res;
    }, error => {

    })
  }
  getFilms(){
    this.filmservice.getAll().subscribe(res => {
      this.films=res;
    }, error => {

    })
  }
  submit(){
    this.showingservice.addOne(this.showing).subscribe(res => {
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
