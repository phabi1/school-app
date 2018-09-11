import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NotifyActionTypes, Notify } from '../actions/notify.actions';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotifyEffects {

  @Effect({ dispatch: false })
  notify$ = this.actions$.pipe(
    ofType(NotifyActionTypes.Notify),
    tap((action: Notify) => {
      this._snackbar.open(action.payload.message, null, {duration: 3000});
    })
  );

  constructor(
    private actions$: Actions,
    private _snackbar: MatSnackBar
  ) { }
}
