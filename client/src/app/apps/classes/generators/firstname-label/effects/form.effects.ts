import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { FormActionTypes, Generate } from '../actions/form.actions';
import { FirstnameLabelService } from '../services/firstname-label.service';


@Injectable()
export class FormEffects {

  private _currentClassId: string;

  @Effect({ dispatch: false })
  generate$ = this.actions$.pipe(
    ofType(FormActionTypes.Generate),
    tap((action: Generate) => {
      this._firstnameLabelService.generate(this._currentClassId, action.payload).subscribe();
    }),
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
