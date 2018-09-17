import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GradesActionTypes, LoadSuccess } from '../actions/grades.actions';
import { switchMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { getCurrentClassId } from '../../../../store/selectors/class.selectors';
import { Observable, zip, forkJoin } from 'rxjs';
import { Grade } from '../models/grade.model';
import { GradesService } from '../services/grades.service';

@Injectable()
export class GradesEffects {

  private _currentClassId: string;

  @Effect()
  load$ = this.actions$.pipe(
    ofType(GradesActionTypes.Load),
    switchMap(() => forkJoin(
      this.loadGrades(),
      this.loadClass(),
    ).pipe(
      map(([grades, classe]) => {
        return new LoadSuccess({
          grades,
          selectedGrades: classe.grades,
          multiple: classe.multipleGrades,
        });
      })
    ))
  );

  constructor(
    private actions$: Actions,
    private gradesService: GradesService,
    private store: Store<any>
  ) {
    this.store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
  }

  private loadGrades(): Observable<Grade[]> {
    return this.gradesService.getGrades();
  }

  private loadClass(): Observable<any> {
    return this.gradesService.getClass(this._currentClassId);
  }
}
