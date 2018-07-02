import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeUpsertComponent } from './event-type-upsert.component';

describe('EventTypeUpsertComponent', () => {
  let component: EventTypeUpsertComponent;
  let fixture: ComponentFixture<EventTypeUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTypeUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
