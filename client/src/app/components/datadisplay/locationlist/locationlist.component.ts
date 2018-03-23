import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import Location from '../../../domain/Location';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.scss']
})
export class LocationlistComponent implements OnInit {
  private _locations: Location[];
  private _error: boolean;
  private _loading: boolean;

  constructor(private locationservice: LocationsService) {this.loading=true;}

  ngOnInit() {
    this.getLocations();
  }

	public get locations(): Location[] {
		return this._locations;
	}

	public set locations(value: Location[]) {
		this._locations = value;
	}

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

  deleteFilm(e): void {
    if(prompt('Weet u zeker dat u dit item wil verwijderen?')){this.locationservice.delete(e).subscribe(res => {
      this.getLocations();
    }, err => {
      alert('Er ging iets mis bij het verrwijderen van deze film');
    })}
  }

  private getLocations(): void {
    this.locationservice.getAll().subscribe(locations => {this.locations=locations; this.loading=false;}, error => {this.error=error;this.loading=false});
  }

  deleteLocation(id){
    if(confirm('Weet u zeker dat u dit ticket wil verwijderen?')) this.locationservice.delete(id).subscribe(res => {
      this.getLocations();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}
