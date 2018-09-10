import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { GradeActionTypes, LoadGradesSuccess, LoadGradesFailure } from '../actions/grade.actions';
import { FirstnameLabelService } from '../services/firstname-label.service';
import { of } from 'rxjs';


@Injectable()
export class GradeEffects {

  private _currentClassId: string;

  @Effect()
  load$ = this.actions$.pipe(
    ofType(GradeActionTypes.LoadGrades),
    switchMap(() => this.firstnameLabelService.getGrades(this._currentClassId)),
    map((grades) => new LoadGradesSuccess({ grades })),
    catchError((err) => of(new LoadGradesFailure({ error: err })))
  );

  constructor(
    private actions$: Actions,
    private firstnameLabelService: FirstnameLabelService,
    private store: Store<any>
  ) {
    this.store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
  }

}
