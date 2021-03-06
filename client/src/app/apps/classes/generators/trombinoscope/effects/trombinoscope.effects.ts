import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GenerateFailure, GenerateSuccess, TrombinoscopeActionTypes } from '../actions/trombinoscope.actions';
import { TrombinoscopeService } from '../services/trombinoscope.service';
import { Store, select } from '@ngrx/store';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';

@Injectable()
export class TrombinoscopeEffects {

  private _currentClassId: string;

  @Effect()
  generate$ = this.actions$.pipe(
    ofType(TrombinoscopeActionTypes.Generate),
    switchMap(() => this._trombinoscopeService.generate(this._currentClassId).pipe(
      map(() => new GenerateSuccess()),
      catchError(() => of(new GenerateFailure())),
    ))
  );

  constructor(
    private actions$: Actions,
    private _trombinoscopeService: TrombinoscopeService,
    private _store: Store<any>
  ) {
    this._store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
  }
}
