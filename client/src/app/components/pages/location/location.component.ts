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
  rooms: Room[];
  private params: Subscription;
  constructor(private route: ActivatedRoute, private locationservice : LocationsService, private roomsservice: RoomsService) { 
    this.loading=true;
    this.location = new Location();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.location.setId(params.id);
      this.getLocation();
    })
  }
  getLocation(): void {
    this.locationservice.getById(this.location._id).subscribe(res => {this.location=res;this.getRooms()}, err => {this.error=true;this.loading=false});
  }
  getRooms(): void {
    this.roomsservice.getByLocation(this.location._id).subscribe(rooms => {this.rooms=rooms;this.loading=false}, error => {});
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
}
