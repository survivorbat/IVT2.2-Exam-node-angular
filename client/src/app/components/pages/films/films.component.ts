import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../../services/films.service';
import Film from '../../../domain/Film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  private films: Film[];
  constructor(private filmservice: FilmsService) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms(): void {
    this.filmservice.getAll().subscribe(films => this.films=films, error => console.log(error));
  }
}
