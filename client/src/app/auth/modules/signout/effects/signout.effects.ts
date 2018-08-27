import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SignoutActionTypes } from '../actions/signout.actions';

@Injectable()
export class SignoutEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(SignoutActionTypes.LoadSignouts));

  constructor(private actions$: Actions) {}
}
