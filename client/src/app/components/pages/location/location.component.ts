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
  location: Location;
  error: boolean;
  loading: boolean;
  private params: Subscription;
  constructor(private route: ActivatedRoute, private locationservice : LocationsService, private roomsservice: RoomsService) { 
    this.loading=true;
    this.location = new Location();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.location.id = params.id;
      this.getLocation();
    })
  }
  getLocation(): void {
    this.locationservice.getById(this.location.id).subscribe(res => {this.location=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
}
