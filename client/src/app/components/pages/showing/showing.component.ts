import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import Showing from '../../../domain/Showing';
import { ShowingsService } from '../../../services/showingservice.service';

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.scss']
})
export class ShowingComponent implements OnInit {
  showing: Showing;
  error: boolean;
  loading: boolean;
  private params: Subscription;
  constructor(private route: ActivatedRoute, private showingservice : ShowingsService) { 
    this.loading=true;
    this.showing = new Showing();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.showing.id = params.id;
      this.getShowing();
    })
  }
  getShowing(): void {
    this.showingservice.getById(this.showing.id).subscribe(res => {this.showing=res;this.loading=false}, err => {this.error=true;this.loading=false});
  }
  ngOnDestroy(){
    this.params.unsubscribe();
  }
  getArrayFromNumber(num: Number): Number[]{
    let rs: Number[] = [];
    for(let i=0;i<num;i++){
      rs.push(0);
    }
    return rs;
  }
}
