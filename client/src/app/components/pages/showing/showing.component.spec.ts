import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingComponent } from './showing.component';

describe('ShowingComponent', () => {
  let component: ShowingComponent;
  let fixture: ComponentFixture<ShowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
