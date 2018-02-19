import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../../services/films.service';
import Film from '../../../domain/Film';

@Component({
  selector: 'app-filmlist',
  templateUrl: './filmlist.component.html',
  styleUrls: ['./filmlist.component.scss']
})
export class FilmlistComponent implements OnInit {
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

  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
}