import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomComponent } from './editroom.component';

describe('EditroomComponent', () => {
  let component: EditroomComponent;
  let fixture: ComponentFixture<EditroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
