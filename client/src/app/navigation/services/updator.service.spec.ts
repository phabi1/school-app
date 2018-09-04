import { TestBed, inject } from '@angular/core/testing';

import { NavigationUpdatorService } from './updator.service';

describe('UpdatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationUpdatorService]
    });
  });

  it('should be created', inject([NavigationUpdatorService], (service: NavigationUpdatorService) => {
    expect(service).toBeTruthy();
  }));
});
