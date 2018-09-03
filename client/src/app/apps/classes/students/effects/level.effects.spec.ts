import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LevelEffects } from './level.effects';

describe('LevelEffects', () => {
  let actions$: Observable<any>;
  let effects: LevelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LevelEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LevelEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
