import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap, mergeAll } from 'rxjs/operators';
import { getCurrentClassId } from '../../../../store/selectors/class.selectors';
import {
  LoadStudentsFailure,
  LoadStudentsSuccess,
  StudentActionTypes,
  AddStudentSuccess,
  AddStudentFailure,
  AddStudent,
  UpdateStudentFailure,
  UpdateStudentSuccess,
  UpdateStudent,
  ShowAddForm,
  ShowUpdateForm,
  ConfirmDeleteStudents,
  DeleteStudents,
  DeleteStudentsSuccess,
  DeleteStudentsFailure
} from '../actions/student.actions';
import { AddComponent } from '../containers/add/add.component';
import { UpdateComponent } from '../containers/update/update.component';
import { StudentsService } from '../services/students.service';
import { ConfirmDeleteComponent } from '../containers/confirm-delete/confirm-delete.component';


@Injectable()
export class StudentsEffects {

  private classId: string;

  @Effect()
  load$: Observable<LoadStudentsSuccess | LoadStudentsFailure> = this.actions$.pipe(
    ofType(StudentActionTypes.LoadStudents),
    switchMap(() => this._studentsService.getStudents(this.classId)),
    map((res) => new LoadStudentsSuccess({ students: res })),
    catchError((err) => of(new LoadStudentsFailure({ error: err })))
  );

  @Effect()
  add$: Observable<AddStudentSuccess | AddStudentFailure> = this.actions$.pipe(
    ofType(StudentActionTypes.AddStudent),
    switchMap((action: AddStudent) => this._studentsService.createStudent(this.classId, action.payload.data).pipe(
      map((student) => new AddStudentSuccess({ student })),
      catchError((err) => of(new AddStudentFailure({ error: err })))
    )),
  );

  @Effect()
  update$: Observable<UpdateStudentSuccess | UpdateStudentFailure> = this.actions$.pipe(
    ofType(StudentActionTypes.UpdateStudent),
    switchMap((action: UpdateStudent) => this._studentsService.updateStudent(this.classId, action.payload.id, action.payload.data).pipe(
      map((student) => new UpdateStudentSuccess({ student: { id: student.id, changes: student } })),
      catchError((err) => of(new UpdateStudentFailure({ error: err })))
    )),
  );

  @Effect({ dispatch: false })
  showAddForm$ = this.actions$.pipe(
    ofType(StudentActionTypes.ShowAddForm),
    tap((action: ShowAddForm) => {
      this._dialog.open(AddComponent, { data: action.payload });
    })
  );

  @Effect({ dispatch: false })
  showUpdateForm$ = this.actions$.pipe(
    ofType(StudentActionTypes.ShowUpdateForm),
    tap((action: ShowUpdateForm) => {
      this._dialog.open(UpdateComponent, { data: action.payload });
    })
  );

  @Effect({ dispatch: false })
  confirmDelete$ = this.actions$.pipe(
    ofType(StudentActionTypes.ConfirmDeleteStudents),
    tap((action: ConfirmDeleteStudents) => {
      this._dialog.open(ConfirmDeleteComponent, { data: action.payload });
    })
  );

  @Effect()
  deletes$ = this.actions$.pipe(
    ofType(StudentActionTypes.DeleteStudents),
    switchMap((action: DeleteStudents) => {
      const actions = [];
      action.payload.ids.forEach((id) => actions.push(this._studentsService.deleteStudent(this.classId, id)));
      return forkJoin(actions).pipe(
        map(() => action.payload.ids)
      );
    }),
    map((ids) => new DeleteStudentsSuccess({ ids })),
    catchError((err) => of(new DeleteStudentsFailure({ error: err })))
  );

  constructor(
    private actions$: Actions,
    private _dialog: MatDialog,
    private _store: Store<any>,
    private _studentsService: StudentsService
  ) {
    this._store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => {
      this.classId = currentClassId;
    });
  }
}
