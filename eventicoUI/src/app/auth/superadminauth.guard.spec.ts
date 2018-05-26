import { TestBed, async, inject } from '@angular/core/testing';

import { SuperadminauthGuard } from './superadminauth.guard';

describe('SuperadminauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperadminauthGuard]
    });
  });

  it('should ...', inject([SuperadminauthGuard], (guard: SuperadminauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
