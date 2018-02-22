import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshowingComponent } from './editshowing.component';

describe('EditshowingComponent', () => {
  let component: EditshowingComponent;
  let fixture: ComponentFixture<EditshowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditshowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
