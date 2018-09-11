import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TrombinoscopeActionTypes } from '../actions/trombinoscope.actions';

@Injectable()
export class TrombinoscopeEffects {

  @Effect()
  generate$ = this.actions$.pipe(ofType(TrombinoscopeActionTypes.Generate));

  constructor(private actions$: Actions) {}
}
