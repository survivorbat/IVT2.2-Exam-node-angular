import { Component, OnInit, Input } from '@angular/core';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import Location from '../../../domain/Location';
import AdminCheck from '../../../domain/interfaces/AdminCheck';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit, AdminCheck {
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

  isAdmin(): boolean {
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }

  ngOnInit() {
    this.getRooms();
  }
  getRooms(): void {
    if(this._location!==undefined){
      this.roomsservice.getByLocation(this._location.id).subscribe(rooms => {this.rooms=rooms;this.loading=false}, error => {this.loading=false});
    } else {
      this.roomsservice.getAll().subscribe(rooms => {this.rooms=rooms;this.loading=false;}, error => {this.loading=false;this.error=true});
    }
  }
  deleteRoom(id){
    if(confirm('Weet u zeker dat u deze ruimte wil verwijderen?')) this.roomsservice.delete(id).subscribe(res => {
      this.getRooms();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}
