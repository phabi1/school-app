import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LoadStudentsFailure, LoadStudentsSuccess, StudentActionTypes, AddStudentSuccess, AddStudentFailure, AddStudent
} from '../actions/student.actions';
import { StudentsService } from '../services/students.service';


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
    switchMap((action: AddStudent) => this._studentsService.createStudent(this.classId, action.payload.data)),
    map((student) => new AddStudentSuccess({student})),
    catchError((err) => of(new AddStudentFailure({error: err})))
  );

  constructor(
    private actions$: Actions,
    private _studentsService: StudentsService
  ) {
    this.classId = '5b83ee62ea40ef20c04183c2';
  }
}
