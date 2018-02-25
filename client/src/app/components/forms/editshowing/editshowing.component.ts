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
  private _showings: Showing[];
  private _films: Film[];
  private _showing: Showing;
  private _rooms: Room[];
  private _errorfield: String;

  constructor(private showingservice: ShowingsService, private roomservice: RoomsService, private filmsservice: FilmsService) {
    this.showings=[];
    this.showing=new Showing();
  }

  ngOnInit() {
    this.getRooms();
    this.getShowings();
    this.getFilms();
  }


	public get showings(): Showing[] {
		return this._showings;
	}

	public set showings(value: Showing[]) {
		this._showings = value;
	}

	public get films(): Film[] {
		return this._films;
	}

	public set films(value: Film[]) {
		this._films = value;
	}

	public get showing(): Showing {
		return this._showing;
	}

	public set showing(value: Showing) {
		this._showing = value;
	}

	public get rooms(): Room[] {
		return this._rooms;
	}

	public set rooms(value: Room[]) {
		this._rooms = value;
	}

	public get errorfield(): String {
		return this._errorfield;
	}

	public set errorfield(value: String) {
		this._errorfield = value;
	}
  

  private getShowings(){
    this.showingservice.getAll().subscribe(res => {
      this.showings=res;
    }, error => {

    })
  }
  private getFilms(){
    this.filmsservice.getAll().subscribe(res => {
      this.films=res;
    }, error => {

    })
  }
  private getRooms(){
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
