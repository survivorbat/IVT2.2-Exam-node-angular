import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlocationComponent } from './newlocation.component';

describe('NewlocationComponent', () => {
  let component: NewlocationComponent;
  let fixture: ComponentFixture<NewlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
