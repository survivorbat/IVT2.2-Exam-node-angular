import { Component, OnInit, Input } from '@angular/core';
import Showing from '../../../domain/Showing';
import {ShowingsService} from '../../../services/showingservice.service';
import Location from '../../../domain/Location';
import AdminCheck from '../../../domain/interfaces/AdminCheck';

@Component({
  selector: 'app-showinglist',
  templateUrl: './showinglist.component.html',
  styleUrls: ['./showinglist.component.scss']
})
export class ShowinglistComponent implements OnInit, AdminCheck {
  private _error: boolean;
  private _loading: boolean;
  private _showings: Showing[];
  private _location: Location;

	public get error(): boolean {
		return this._error;
	}

	public set error(value: boolean) {
		this._error = value;
	}

	public get loading(): boolean {
		return this._loading;
	}

	public set loading(value: boolean) {
		this._loading = value;
	}

	public get showings(): Showing[] {
		return this._showings;
	}

	public set showings(value: Showing[]) {
		this._showings = value;
	}

	get location(): Location {
		return this._location;
	}
  
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
  private getShowings(): void {
    if(this.location!==undefined && this.location._id!==undefined){
      this.showingsservice.getByLocation(this.location._id).subscribe(showings => {this.showings=showings;this.loading=false}, error => {this.loading=false;this.error=true});
    } else {
      this.showingsservice.getAll().subscribe(showings => {this.showings=showings;this.loading=false}, error => {this.loading=false;this.error=true});
    }
  }
  isAdmin(): boolean {
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
  deleteShowing(id){
    if(confirm('Weet u zeker dat u deze voorstelling wil verwijderen?')) this.showingsservice.delete(id).subscribe(res => {
      this.getShowings();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}