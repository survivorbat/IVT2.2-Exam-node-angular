import { Component, OnInit } from '@angular/core';
import Location from '../../../domain/Location';
import { LocationsService } from '../../../services/locations.service';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.scss']
})
export class EditlocationComponent implements OnInit {
  locations: Location[];
  location: Location;
  errorfield: String;

  constructor(private locationservice: LocationsService) {
    this.locations=[];
    this.location=new Location();
  }

  ngOnInit() {
    this.getLocations();
  }
  getLocations(){
    this.locationservice.getAll().subscribe(res => {
      this.locations=res;
    }, error => {

    })
  }
  selectLocation(e: any){
    this.locationservice.getById(e.target.value).subscribe(res => {
      this.location=res;
    }, err => {
      
    });
  }
  submit(){
    this.locationservice.patch(this.location).subscribe(res => this.errorfield="Succesvol aangepast", err => this.errorfield="Er ging iets mis");
  }
}
