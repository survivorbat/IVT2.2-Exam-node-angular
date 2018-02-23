import { Component, OnInit } from '@angular/core';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import Location from '../../../domain/Location';
import { LocationsService } from '../../../services/locations.service';

@Component({
  selector: 'app-editroom',
  templateUrl: './editroom.component.html',
  styleUrls: ['./editroom.component.scss']
})
export class EditroomComponent implements OnInit {
  rooms: Room[];
  room: Room;
  locations: Location[];
  errorfield: String;

  constructor(private roomservice: RoomsService, private locationservice: LocationsService) {
    this.rooms=[];
    this.room=new Room();
  }

  ngOnInit() {
    this.getLocations();
    this.getRooms();
  }
  getRooms(){
    this.roomservice.getAll().subscribe(res => {
      this.rooms=res;
    }, error => {

    })
  }
  getLocations(){
    this.locationservice.getAll().subscribe(res => {
      this.locations=res;
    }, error => {

    })
  }
  selectRoom(e: any){
    this.roomservice.getById(e.target.value).subscribe(res => {
      this.room=res;
    }, err => {
      
    });
  }
  submit(){
    this.roomservice.patch(this.room).subscribe(res => this.errorfield="Succesvol aangepast", err => this.errorfield="Er ging iets mis");
  }
}
