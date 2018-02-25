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
  private _rooms: Room[];
  private _room: Room;
  private _locations: Location[];
  private _errorfield: String;

  constructor(private roomservice: RoomsService, private locationservice: LocationsService) {
    this.rooms=[];
    this.room=new Room();
  }

  ngOnInit() {
    this.getLocations();
    this.getRooms();
  }


	public get rooms(): Room[] {
		return this._rooms;
	}

	public set rooms(value: Room[]) {
		this._rooms = value;
	}

	public get locations(): Location[] {
		return this._locations;
	}

	public set locations(value: Location[]) {
		this._locations = value;
	}

	public get errorfield(): String {
		return this._errorfield;
	}

	public set errorfield(value: String) {
		this._errorfield = value;
	}

	public get room(): Room {
		return this._room;
	}

	public set room(value: Room) {
		this._room = value;
	}
  

  private getRooms(){
    this.roomservice.getAll().subscribe(res => {
      this.rooms=res;
    }, error => {

    })
  }
  private getLocations(){
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
