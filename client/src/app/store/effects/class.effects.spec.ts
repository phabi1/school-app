import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClassEffects } from './class.effects';

describe('ClassEffects', () => {
  let actions$: Observable<any>;
  let effects: ClassEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClassEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ClassEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
