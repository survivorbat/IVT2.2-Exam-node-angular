import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Room from '../../../domain/Room';
import { RoomsService } from '../../../services/rooms.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  private _room: Room;
  private _error: boolean;
  private _loading: boolean;
  private params: Subscription;
  constructor(private route: ActivatedRoute, private roomservice : RoomsService) { 
    this.loading=true;
    this.room = new Room();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.room._id = params.id;
      this.getRoom();
    })
  }


	public get room(): Room {
		return this._room;
	}

	public set room(value: Room) {
		this._room = value;
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
  
  getRoom(): void {
    this.roomservice.getById(this.room._id).subscribe(res => {this.room=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
}
