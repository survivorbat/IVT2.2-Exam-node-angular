import { Component, OnInit } from '@angular/core';
import Location from '../../../domain/Location';
import { LocationsService } from '../../../services/locations.service';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.scss']
})
export class EditlocationComponent implements OnInit {
  private _locations: Location[];
  private _location: Location;
  private _errorfield: String;

  constructor(private locationservice: LocationsService) {
    this.locations=[];
    this.location=new Location();
  }

  ngOnInit() {
    this.getLocations();
  }


	public get locations(): Location[] {
		return this._locations;
	}

	public set locations(value: Location[]) {
		this._locations = value;
	}

	public get location(): Location {
		return this._location;
	}

	public set location(value: Location) {
		this._location = value;
	}

	public get errorfield(): String {
		return this._errorfield;
	}

	public set errorfield(value: String) {
		this._errorfield = value;
	}
  

  private getLocations(){
    this.locationservice.getAll().subscribe(res => {
      this.locations=res;
    }, error => {

    })
  }
  selectLocation(e: any){
    this.locationservice.getById(e.target.value).subscribe(res => {
      this.location=res;
    }, err => {
      
    });
  }
  submit(){
    this.locationservice.patch(this.location).subscribe(res => this.errorfield="Succesvol aangepast", err => this.errorfield="Er ging iets mis");
  }
}
