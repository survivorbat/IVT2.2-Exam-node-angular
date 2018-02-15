import { Component, OnInit, Input } from '@angular/core';
import Showing from '../../../domain/Showing';
import {ShowingsService} from '../../../services/showingservice.service';
import Location from '../../../domain/Location';

@Component({
  selector: 'app-showinglist',
  templateUrl: './showinglist.component.html',
  styleUrls: ['./showinglist.component.scss']
})
export class ShowinglistComponent implements OnInit {
  error: boolean;
  loading: boolean;
  showings: Showing[];
  _location: Location;
  @Input() set location(location: Location){
    this._location = location;
    this.getShowings();
  }

  constructor(private showingsservice: ShowingsService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getShowings();
  }
  getShowings(): void {
    if(this._location!==undefined){
      this.showingsservice.getByLocation(this._location.id).subscribe(showings => {this.showings=showings;this.loading=false}, error => {this.loading=false});
    } else {
      this.showingsservice.getAll().subscribe(showings => {this.showings=showings;this.loading=false;console.log(this.showings)}, error => {this.loading=false});
    }
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
}
