import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../../services/films.service';
import Film from '../../../domain/Film';
import AdminCheck from '../../../domain/interfaces/AdminCheck';

@Component({
  selector: 'app-filmlist',
  templateUrl: './filmlist.component.html',
  styleUrls: ['./filmlist.component.scss']
})
export class FilmlistComponent implements OnInit, AdminCheck {
  films: Film[];
  error: boolean;
  loading: boolean;
  constructor(private filmservice: FilmsService) {
    this.loading=true;
  }

  ngOnInit() {
    this.getFilms();
  }

  getFilms(): void {
    this.filmservice.getAll().subscribe(films => {this.films=films; this.loading=false;}, error => {this.error=error;this.loading=false});
  }

  deleteFilm(e): void {
    if(confirm('Weet u zeker dat u dit item wil verwijderen?')){this.filmservice.delete(e).subscribe(res => {
      this.getFilms();
    }, err => {
      alert('Er ging iets mis bij het verrwijderen van deze film, probeert u het nog een keer');
    })}
  }

  isAdmin(): boolean{
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }

  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
}
