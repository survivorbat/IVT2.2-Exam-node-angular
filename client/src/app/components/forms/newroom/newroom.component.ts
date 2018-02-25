import { Component, OnInit } from '@angular/core';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import Location from '../../../domain/Location';
import { LocationsService } from '../../../services/locations.service';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.scss']
})
export class NewroomComponent implements OnInit {
  private _room: Room;
  private _locations: Location[];
  private _errorfield: String;
  constructor(private roomservice: RoomsService, private locationservice: LocationsService) {this.room=new Room()}

  ngOnInit() {
    this.getLocations();
  }


	public get room(): Room {
		return this._room;
	}

	public set room(value: Room) {
		this._room = value;
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
  

  private getLocations(){
    this.locationservice.getAll().subscribe(res => {
      this.locations=res;
    }, error => {

    })
  }
  submit(){
    this.roomservice.addOne(this.room).subscribe(res => {
      this.errorfield="Succesvol toegevoegd!";
    }, error => {
      console.log(error);
      if(error.status===422){
        this.errorfield="Er ging iets mis bij het versturen van dit formulier, heeft u alles goed ingevuld?";
      } else if(error.status===500){
        this.errorfield="Er ging iets mis bij onze servers, probeert u het alstublieft nog een keer."
      } else if(error.status===409){
        this.errorfield="Er bestaat al een account met dit e-mail adres, bent u uw wachtwoord vergeten?";
      }
    });
  }
}
