import { Component, OnInit } from '@angular/core';
import Showing from '../../../domain/Showing';
import { ShowingsService } from '../../../services/showingservice.service';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import Film from '../../../domain/Film';
import { FilmsService } from '../../../services/films.service';

@Component({
  selector: 'app-editshowing',
  templateUrl: './editshowing.component.html',
  styleUrls: ['./editshowing.component.scss']
})
export class EditshowingComponent implements OnInit {
  showings: Showing[];
  films: Film[];
  showing: Showing;
  rooms: Room[];
  errorfield: String;

  constructor(private showingservice: ShowingsService, private roomservice: RoomsService, private filmsservice: FilmsService) {
    this.showings=[];
    this.showing=new Showing();
  }

  ngOnInit() {
    this.getRooms();
    this.getShowings();
    this.getFilms();
  }
  getShowings(){
    this.showingservice.getAll().subscribe(res => {
      this.showings=res;
    }, error => {

    })
  }
  getFilms(){
    this.filmsservice.getAll().subscribe(res => {
      this.films=res;
    }, error => {

    })
  }
  getRooms(){
    this.roomservice.getAll().subscribe(res => {
      this.rooms=res;
    }, error => {

    })
  }
  selectShowing(e: any){
    this.showingservice.getById(e.target.value).subscribe(res => {
      this.showing=res;
    }, err => {
      
    });
  }
  submit(){
    this.showingservice.patch(this.showing).subscribe(res => this.errorfield="Succesvol aangepast", err => this.errorfield="Er ging iets mis");
  }
}
