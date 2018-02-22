import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfilmComponent } from './editfilm.component';

describe('EditfilmComponent', () => {
  let component: EditfilmComponent;
  let fixture: ComponentFixture<EditfilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
