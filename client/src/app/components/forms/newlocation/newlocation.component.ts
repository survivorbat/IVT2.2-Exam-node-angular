import { Component, OnInit } from '@angular/core';
import Location from '../../../domain/Location';
import AdminCheck from '../../../domain/interfaces/AdminCheck';
import { LocationsService } from '../../../services/locations.service';

@Component({
  selector: 'app-newlocation',
  templateUrl: './newlocation.component.html',
  styleUrls: ['./newlocation.component.scss']
})
export class NewlocationComponent implements OnInit {
  location: Location;
  errorfield: String;
  constructor(private locationservice: LocationsService) {this.location=new Location()}

  ngOnInit() {
  }

  submit(){
    this.locationservice.addOne(this.location).subscribe(res => {
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
