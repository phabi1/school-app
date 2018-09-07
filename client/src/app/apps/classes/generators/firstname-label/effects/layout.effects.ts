import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LayoutActionTypes, LoadLayoutsSuccess } from '../actions/layout.actions';
import { switchMap, map } from 'rxjs/operators';
import { FirstnameLabelService } from '../services/firstname-label.service';


@Injectable()
export class LayoutEffects {

  @Effect()
  load$ = this.actions$.pipe(
    ofType(LayoutActionTypes.LoadLayouts),
    switchMap(() => this._firstnameLabelService.getLayouts()),
    map((layouts) => new LoadLayoutsSuccess({ layouts }))
  );

  constructor(
    private actions$: Actions,
    private _firstnameLabelService: FirstnameLabelService
  ) { }
}
