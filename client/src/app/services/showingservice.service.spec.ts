import { TestBed, inject } from '@angular/core/testing';

import { ShowingserviceService } from './showingservice.service';

describe('ShowingserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowingserviceService]
    });
  });

  it('should be created', inject([ShowingserviceService], (service: ShowingserviceService) => {
    expect(service).toBeTruthy();
  }));
});
