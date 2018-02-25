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
  private _showing: Showing;
  private _error: boolean;
  private _loading: boolean;
  private _params: Subscription;
  constructor(private route: ActivatedRoute, private showingservice : ShowingsService) { 
    this.loading=true;
    this.showing = new Showing();
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.showing._id = params.id;
      this.getShowing();
    })
  }


	public get showing(): Showing {
		return this._showing;
	}

	public set showing(value: Showing) {
		this._showing = value;
	}

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

	public get params(): Subscription {
		return this._params;
	}

	public set params(value: Subscription) {
		this._params = value;
	}
  
  private getShowing(): void {
    this.showingservice.getById(this.showing._id).subscribe(res => {this.showing=res;this.loading=false}, err => {this.error=true;this.loading=false});
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
