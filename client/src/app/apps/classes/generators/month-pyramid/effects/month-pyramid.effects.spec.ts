import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MonthPyramidEffects } from './month-pyramid.effects';

describe('MonthPyramidEffects', () => {
  let actions$: Observable<any>;
  let effects: MonthPyramidEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MonthPyramidEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MonthPyramidEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
