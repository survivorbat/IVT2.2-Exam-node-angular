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
  room: Room;
  error: boolean;
  loading: boolean;
  private params: Subscription;
  constructor(private route: ActivatedRoute, private roomservice : RoomsService) { 
    this.loading=true;
    this.room = new Room();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.room.id = params.id;
      this.getRoom();
    })
  }
  getRoom(): void {
    this.roomservice.getById(this.room.id).subscribe(res => {this.room=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
}
