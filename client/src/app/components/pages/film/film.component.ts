import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Film from '../../../domain/Film';
import { FilmsService } from '../../../services/films.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  private film: Film;
  private error: boolean;
  private loading: boolean;
  constructor(private route: ActivatedRoute, private filmservice : FilmsService) { this.loading=true }

  ngOnInit() {
    this.getFilm();
  }
  getFilm(): void {
    this.filmservice.getById(this.route.params._value.id).subscribe(res => {this.film=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
}
