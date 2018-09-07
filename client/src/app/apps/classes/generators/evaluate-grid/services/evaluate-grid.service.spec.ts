import { TestBed, inject } from '@angular/core/testing';

import { EvaluateGridService } from './evaluate-grid.service';

describe('EvaluateGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluateGridService]
    });
  });

  it('should be created', inject([EvaluateGridService], (service: EvaluateGridService) => {
    expect(service).toBeTruthy();
  }));
});
