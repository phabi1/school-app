import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { GradeActionTypes, SelectGrade, DeselectGrade } from '../actions/grade.actions';
import { LoadStudentsFailure, LoadStudentsSuccess, SetSelectedStudents, StudentActionTypes } from '../actions/student.actions';
import { getState as getStudentState } from '../selectors/student.selectors';
import { getState as getGradeState } from '../selectors/grade.selectors';
import { FirstnameLabelService } from '../services/firstname-label.service';
import { Grade } from '../models/grade.model';


@Injectable()
export class StudentEffects {

  private _currentClassId: string;

  @Effect()
  load$ = this.actions$.pipe(
    ofType(StudentActionTypes.LoadStudents),
    switchMap(() => this._firstnameLabelService.getStudents(this._currentClassId)),
    map((students) => new LoadStudentsSuccess({ students })),
    catchError(err => of(new LoadStudentsFailure({ error: err })))
  );

  @Effect()
  selectGrade$ = this.actions$.pipe(
    ofType(
      GradeActionTypes.SelectGrade,
    ),
    map((action: SelectGrade) => {
      let ids: string[] = [];

      this._store.pipe(select(getStudentState)).subscribe((state) => {

        ids = [...state.selectedIds];

        const students = (state.ids as string[]).map((id) => state.entities[id]);

        students.forEach((student) => {
          const checked = student.grade === action.payload.id;

          if (checked) {
            ids.push(student.id);
          }
        });
      });

      return new SetSelectedStudents({ ids });
    })
  );

  @Effect()
  deselectGrade$ = this.actions$.pipe(
    ofType(
      GradeActionTypes.DeselectGrade,
    ),
    map((action: DeselectGrade) => {
      let ids: string[] = [];

      this._store.pipe(select(getStudentState)).subscribe((state) => {

        ids = [...state.selectedIds];

        const selectedStudents = ids.map((id) => state.entities[id]);

        selectedStudents.forEach((student) => {
          const checked = student.grade === action.payload.id;

          if (checked) {
            ids.splice(ids.indexOf(student.id), 1);
          }
        });
      });

      return new SetSelectedStudents({ ids });
    })
  );

  constructor(
    private actions$: Actions,
    private _firstnameLabelService: FirstnameLabelService,
    private _store: Store<any>
  ) {
    this._store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
  }
}
