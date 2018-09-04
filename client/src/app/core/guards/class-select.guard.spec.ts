import { TestBed, async, inject } from '@angular/core/testing';

import { ClassSelectGuard } from './class-select.guard';

describe('ClassSelectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassSelectGuard]
    });
  });

  it('should ...', inject([ClassSelectGuard], (guard: ClassSelectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
