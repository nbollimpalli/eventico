import { TestBed, inject } from '@angular/core/testing';

import { EventVenueService } from './event-venue.service';

describe('EventVenueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventVenueService]
    });
  });

  it('should be created', inject([EventVenueService], (service: EventVenueService) => {
    expect(service).toBeTruthy();
  }));
});
