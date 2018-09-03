import { TestBed, inject } from '@angular/core/testing';

import { MonthPyramidService } from './month-pyramid.service';

describe('MonthPyramidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthPyramidService]
    });
  });

  it('should be created', inject([MonthPyramidService], (service: MonthPyramidService) => {
    expect(service).toBeTruthy();
  }));
});
