import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { FormActionTypes, Generate, GenerateFailure, GenerateSuccess } from '../actions/form.actions';
import { FirstnameLabelService } from '../services/firstname-label.service';
import { of } from 'rxjs';


@Injectable()
export class FormEffects {

  private _currentClassId: string;

  @Effect()
  generate$ = this.actions$.pipe(
    ofType(FormActionTypes.Generate),
    switchMap((action: Generate) => this._firstnameLabelService.generate(this._currentClassId, action.payload)),
    map(() => new GenerateSuccess()),
    catchError(err => of(new GenerateFailure({ error: err })))
  );

  constructor(
    private actions$: Actions,
    private _store: Store<any>,
    private _firstnameLabelService: FirstnameLabelService

  ) {
    this._store
      .pipe(
        select(getCurrentClassId)
      )
      .subscribe((currentClassId) => this._currentClassId = currentClassId);
  }
}
