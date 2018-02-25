import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Location from '../../../domain/Location';
import { LocationsService } from '../../../services/locations.service';
import { Subscription } from 'rxjs/Subscription';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  private _location: Location;
  private _error: boolean;
  private _loading: boolean;
  private params: Subscription;
  constructor(private route: ActivatedRoute, private locationservice : LocationsService) { 
    this.loading=true;
    this.location = new Location();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.location._id = params.id;
      this.getLocation();
    })
  }

	public get location(): Location {
		return this._location;
	}

	public set location(value: Location) {
		this._location = value;
	}

	public get error(): boolean {
		return this._error;
	}

	public set error(value: boolean) {
		this._error = value;
	}

	public get $params(): Subscription {
		return this.params;
	}

	public set $params(value: Subscription) {
		this.params = value;
	}

	public get loading(): boolean {
		return this._loading;
	}

	public set loading(value: boolean) {
		this._loading = value;
	}
  
  private getLocation(): void {
    this.locationservice.getById(this.location._id).subscribe(res => {this.location=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
}
