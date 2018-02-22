import { Component, OnInit } from '@angular/core';
import Film from '../../../domain/Film';
import { FilmsService } from '../../../services/films.service';

@Component({
  selector: 'app-editfilm',
  templateUrl: './editfilm.component.html',
  styleUrls: ['./editfilm.component.scss']
})
export class EditfilmComponent implements OnInit {
  films: Film[];
  film: Film;
  errorfield: String;

  constructor(private filmservice: FilmsService) {
    this.films=[];
    this.film=new Film();
  }

  ngOnInit() {
    this.getFilms();
  }
  getFilms(){
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
