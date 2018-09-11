import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SignoutActionTypes, SignoutSuccess, SignoutFailure } from '../actions/signout.actions';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Store } from '@ngrx/store';
import { Authenticated } from 'ngrx-auth-store';
import { of } from 'rxjs';

@Injectable()
export class SignoutEffects {

  @Effect()
  signout$ = this.actions$.pipe(
    ofType(SignoutActionTypes.Signout),
    switchMap(() => this._authenticationService.signout()),
    tap(() => this._store.dispatch(new Authenticated({ token: null, refreshToken: null, identity: null }))),
    map(() => new SignoutSuccess()),
    catchError((err) => of(new SignoutFailure({error: err})))
  );

  constructor(
    private actions$: Actions,
    private _authenticationService: AuthenticationService,
    private _store: Store<any>
  ) { }
}
