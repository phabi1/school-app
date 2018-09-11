import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TrombinoscopeEffects } from './trombinoscope.effects';

describe('TrombinoscopeEffects', () => {
  let actions$: Observable<any>;
  let effects: TrombinoscopeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrombinoscopeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TrombinoscopeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
