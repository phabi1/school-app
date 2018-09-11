import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NotifyEffects } from './notify.effects';

describe('NotifyEffects', () => {
  let actions$: Observable<any>;
  let effects: NotifyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotifyEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(NotifyEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
