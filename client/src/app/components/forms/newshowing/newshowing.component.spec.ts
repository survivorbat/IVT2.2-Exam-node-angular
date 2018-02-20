import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewshowingComponent } from './newshowing.component';

describe('NewshowingComponent', () => {
  let component: NewshowingComponent;
  let fixture: ComponentFixture<NewshowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewshowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewshowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
