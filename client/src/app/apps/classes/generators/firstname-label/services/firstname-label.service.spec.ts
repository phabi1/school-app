import { TestBed, inject } from '@angular/core/testing';

import { FirstnameLabelService } from './firstname-label.service';

describe('FirstnameLabelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstnameLabelService]
    });
  });

  it('should be created', inject([FirstnameLabelService], (service: FirstnameLabelService) => {
    expect(service).toBeTruthy();
  }));
});
