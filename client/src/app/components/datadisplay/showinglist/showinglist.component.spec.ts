import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowinglistComponent } from './showinglist.component';

describe('ShowinglistComponent', () => {
  let component: ShowinglistComponent;
  let fixture: ComponentFixture<ShowinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
