import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventVenueComponent } from './new-event-venue.component';

describe('NewEventVenueComponent', () => {
  let component: NewEventVenueComponent;
  let fixture: ComponentFixture<NewEventVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
