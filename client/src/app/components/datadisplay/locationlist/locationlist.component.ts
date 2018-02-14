import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import Location from '../../../domain/Location';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.scss']
})
export class LocationlistComponent implements OnInit {
  locations: Location[];
  error: boolean;
  loading: boolean;

  constructor(private locationservice: LocationsService) {
    this.loading=true;
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations(): void {
    this.locationservice.getAll().subscribe(locations => {this.locations=locations; this.loading=false;}, error => {this.error=error;this.loading=false});
  }
}
