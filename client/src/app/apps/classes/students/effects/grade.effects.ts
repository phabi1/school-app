import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../store/selectors/class.selectors';
import { GradeActionTypes, LoadGradesFailure, LoadGradesSuccess } from '../actions/grade.actions';
import { StudentsService } from '../services/students.service';


@Injectable()
export class GradeEffects {

  private classId: string;

  @Effect()
  load$: Observable<LoadGradesSuccess | LoadGradesFailure> = this.actions$.pipe(
    ofType(GradeActionTypes.LoadGrades),
    switchMap(() => this._studentsService.getGrades(this.classId)),
    map((grades) => new LoadGradesSuccess({ grades })),
    catchError((err) => of(new LoadGradesFailure({ error: err })))
  );

  constructor(
    private actions$: Actions,
    private _store: Store<any>,
    private _studentsService: StudentsService
  ) {
    this._store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => {
      this.classId = currentClassId;
    });
  }
}
