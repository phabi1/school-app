import { TestBed, inject } from '@angular/core/testing';

import { AttendanceGridService } from './attendance-grid.service';

describe('AttendanceGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceGridService]
    });
  });

  it('should be created', inject([AttendanceGridService], (service: AttendanceGridService) => {
    expect(service).toBeTruthy();
  }));
});
