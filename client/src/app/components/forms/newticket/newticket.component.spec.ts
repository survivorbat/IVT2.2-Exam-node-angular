import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewticketComponent } from './newticket.component';

describe('NewticketComponent', () => {
  let component: NewticketComponent;
  let fixture: ComponentFixture<NewticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
