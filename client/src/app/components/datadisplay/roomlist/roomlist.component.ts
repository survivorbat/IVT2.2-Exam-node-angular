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
  private _error: boolean;
  private _loading: boolean;
  private _rooms: Room[];
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

	public get rooms(): Room[] {
		return this._rooms;
	}

	public set rooms(value: Room[]) {
		this._rooms = value;
	}

	get location(): Location {
		return this._location;
	}
  
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

  isAdmin(): boolean {
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }
  
  private getRooms(): void {
    if(this.location!==undefined  && this.location._id!==undefined){
      this.roomsservice.getByLocation(this.location._id).subscribe(rooms => {this.rooms=rooms;this.loading=false}, error => {this.loading=false});
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
