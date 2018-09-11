import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { GenerateFailure, GenerateSuccess, MonthPyramidActionTypes } from '../actions/month-pyramid.actions';
import { MonthPyramidService } from '../services/month-pyramid.service';

@Injectable()
export class MonthPyramidEffects {

  private _currentClassId: string;

  @Effect()
  generate$ = this.actions$.pipe(
    ofType(MonthPyramidActionTypes.Generate),
    switchMap(() => this._monthPyramidService.generate(this._currentClassId).pipe(
      map(() => new GenerateSuccess()),
      catchError((err) => of(new GenerateFailure({error: err})))
    ))
  );

  constructor(
    private actions$: Actions,
    private _monthPyramidService: MonthPyramidService,
    private _store: Store<any>,
  ) {
    this._store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
  }
}
