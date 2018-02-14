import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import Location from '../../../domain/Location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
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
