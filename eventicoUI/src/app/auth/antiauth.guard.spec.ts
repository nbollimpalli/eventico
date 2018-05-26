import { TestBed, async, inject } from '@angular/core/testing';

import { AntiauthGuard } from './antiauth.guard';

describe('AntiauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntiauthGuard]
    });
  });

  it('should ...', inject([AntiauthGuard], (guard: AntiauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
