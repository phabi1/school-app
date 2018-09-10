import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Student } from '../models/student.model';

export enum StudentActionTypes {
  LoadStudents = '[Student] Load Students',
  LoadStudentsSuccess = '[Student] Load Students Success',
  LoadStudentsFailure = '[Student] Load Students Failure',
  ClearStudents = '[Student] Clear Students',
  SetSelectedStudents = '[Student] Set Selected Students',
}

export class LoadStudents implements Action {
  readonly type = StudentActionTypes.LoadStudents;
}
export class LoadStudentsSuccess implements Action {
  readonly type = StudentActionTypes.LoadStudentsSuccess;

  constructor(public payload: { students: Student[] }) { }
}
export class LoadStudentsFailure implements Action {
  readonly type = StudentActionTypes.LoadStudentsFailure;

  constructor(public payload: { error: any }) { }
}

export class ClearStudents implements Action {
  readonly type = StudentActionTypes.ClearStudents;
}

export class SetSelectedStudents implements Action {
  readonly type = StudentActionTypes.SetSelectedStudents;
  constructor(public payload: { ids: string[] }) { }
}

export type StudentActions =
  LoadStudents
  | LoadStudentsSuccess
  | LoadStudentsFailure
  | ClearStudents
  | SetSelectedStudents;
