import { TestBed, inject } from '@angular/core/testing';

import { CalendarMonthService } from './calendar-month.service';

describe('CalendarMonthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarMonthService]
    });
  });

  it('should be created', inject([CalendarMonthService], (service: CalendarMonthService) => {
    expect(service).toBeTruthy();
  }));
});
