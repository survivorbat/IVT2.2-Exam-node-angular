import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Film from '../../../domain/Film';
import { FilmsService } from '../../../services/films.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  film: Film;
  error: boolean;
  loading: boolean;
  private params: Subscription;
  constructor(private route: ActivatedRoute, private filmservice : FilmsService) { 
    this.loading=true;
    this.film = new Film();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.film._id=params.id;
      this.getFilm();
    })
  }
  getFilm(): void {
    this.filmservice.getById(this.film._id).subscribe(res => {this.film=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
}
