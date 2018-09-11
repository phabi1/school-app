import { TestBed, inject } from '@angular/core/testing';

import { TrombinoscopeService } from './trombinoscope.service';

describe('TrombinoscopeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrombinoscopeService]
    });
  });

  it('should be created', inject([TrombinoscopeService], (service: TrombinoscopeService) => {
    expect(service).toBeTruthy();
  }));
});
