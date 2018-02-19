import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import Location from '../../../domain/Location';
import AdminCheck from '../../../domain/interfaces/AdminCheck';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.scss']
})
export class LocationlistComponent implements OnInit, AdminCheck {
  locations: Location[];
  error: boolean;
  loading: boolean;

  constructor(private locationservice: LocationsService) {
    this.loading=true;
  }

  ngOnInit() {
    this.getLocations();
  }

  deleteFilm(e): void {
    if(prompt('Weet u zeker dat u dit item wil verwijderen?')){this.locationservice.delete(e).subscribe(res => {
      this.getLocations();
    }, err => {
      alert('Er ging iets mis bij het verrwijderen van deze film');
    })}
  }

  isAdmin(): boolean {
    return parseInt(window.localStorage.getItem('authlevel'))>0;
  }

  getLocations(): void {
    this.locationservice.getAll().subscribe(locations => {this.locations=locations; this.loading=false;}, error => {this.error=error;this.loading=false});
  }

  deleteLocation(id){
    if(confirm('Weet u zeker dat u dit ticket wil verwijderen?')) this.locationservice.delete(id).subscribe(res => {
      this.getLocations();
    }, error => {
      alert("Er ging iets mis bij het verwijderen, probeert u het alstublieft nog een keer");
    });
  }
}
