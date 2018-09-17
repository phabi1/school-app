import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GradesEffects } from './grades.effects';

describe('GradesEffects', () => {
  let actions$: Observable<any>;
  let effects: GradesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GradesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GradesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
