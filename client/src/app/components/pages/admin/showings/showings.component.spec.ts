import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingsComponent } from './showings.component';

describe('ShowingsComponent', () => {
  let component: ShowingsComponent;
  let fixture: ComponentFixture<ShowingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
