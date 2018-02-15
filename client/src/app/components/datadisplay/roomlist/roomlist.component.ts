import { Component, OnInit, Input } from '@angular/core';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import Location from '../../../domain/Location';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {
  error: boolean;
  loading: boolean;
  rooms: Room[];
  _location: Location;
  @Input() set location(location: Location){
    this._location = location;
    this.getRooms();
  }

  constructor(private roomsservice: RoomsService) { 
    this.loading=true;
  }

  ngOnInit() {
    this.getRooms();
  }
  getRooms(): void {
    if(this._location!==undefined){
      this.roomsservice.getByLocation(this._location.id).subscribe(rooms => {this.rooms=rooms;this.loading=false}, error => {this.loading=false});
    } else {
      this.roomsservice.getAll().subscribe(rooms => {this.rooms=rooms;this.loading=false;}, error => {this.loading=false});
    }
  }
}
