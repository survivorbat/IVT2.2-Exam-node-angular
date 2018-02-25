import { Component, OnInit } from '@angular/core';
import Film from '../../../domain/Film';
import { FilmsService } from '../../../services/films.service';

@Component({
  selector: 'app-editfilm',
  templateUrl: './editfilm.component.html',
  styleUrls: ['./editfilm.component.scss']
})
export class EditfilmComponent implements OnInit {
  private _films: Film[];
  private _film: Film;
  private _errorfield: String;

  constructor(private filmservice: FilmsService) {
    this.films=[];
    this.film=new Film();
  }

  ngOnInit() {
    this.getFilms();
  }


	public get films(): Film[] {
		return this._films;
	}

	public set films(value: Film[]) {
		this._films = value;
	}

	public get film(): Film {
		return this._film;
	}

	public set film(value: Film) {
		this._film = value;
	}

	public get errorfield(): String {
		return this._errorfield;
	}

	public set errorfield(value: String) {
		this._errorfield = value;
	}

  private getFilms(){
    this.filmservice.getAll().subscribe(res => {
      this.films=res;
    }, error => {

    })
  }
  selectFilm(e: any){
    this.filmservice.getById(e.target.value).subscribe(res => {
      this.film=res;
    }, err => {
      
    });
  }
  submit(){
    this.filmservice.patch(this.film).subscribe(res => this.errorfield="Succesvol aangepast", err => this.errorfield="Er ging iets mis");
  }
}
