import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { RouterActionTypes, Go } from '../actions/router.actions';


@Injectable()
export class RouterEffects {

  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType(RouterActionTypes.Go),
    tap((action: Go) => {
      this._router.navigate(action.payload.path, { queryParams: action.payload.queryParams || {} });
    })
  );

  constructor(
    private actions$: Actions,
    private _router: Router,
  ) { }
}
