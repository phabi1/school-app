import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Student } from '../models/student.model';

export enum StudentActionTypes {
  LoadStudents = '[Student] Load Students',
  LoadStudentsSuccess = '[Student] Load Students Success',
  LoadStudentsFailure = '[Student] Load Students Failure',
  AddStudent = '[Student] Add Student',
  AddStudentSuccess = '[Student] Add Student Success',
  AddStudentFailure = '[Student] Add Student Failure',
  UpsertStudent = '[Student] Upsert Student',
  AddStudents = '[Student] Add Students',
  UpsertStudents = '[Student] Upsert Students',
  UpdateStudent = '[Student] Update Student',
  UpdateStudents = '[Student] Update Students',
  DeleteStudent = '[Student] Delete Student',
  DeleteStudents = '[Student] Delete Students',
  ClearStudents = '[Student] Clear Students',
  SetCurrentStudent = '[Student] Set Current Student',
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

export class AddStudent implements Action {
  readonly type = StudentActionTypes.AddStudent;
  constructor(public payload: { data: any }) { }
}

export class AddStudentSuccess implements Action {
  readonly type = StudentActionTypes.AddStudentSuccess;
  constructor(public payload: { student: Student }) { }
}

export class AddStudentFailure implements Action {
  readonly type = StudentActionTypes.AddStudentFailure;
  constructor(public payload: { error: any }) { }
}

export class UpsertStudent implements Action {
  readonly type = StudentActionTypes.UpsertStudent;

  constructor(public payload: { student: Student }) { }
}

export class AddStudents implements Action {
  readonly type = StudentActionTypes.AddStudents;

  constructor(public payload: { students: Student[] }) { }
}

export class UpsertStudents implements Action {
  readonly type = StudentActionTypes.UpsertStudents;

  constructor(public payload: { students: Student[] }) { }
}

export class UpdateStudent implements Action {
  readonly type = StudentActionTypes.UpdateStudent;

  constructor(public payload: { student: Update<Student> }) { }
}

export class UpdateStudents implements Action {
  readonly type = StudentActionTypes.UpdateStudents;

  constructor(public payload: { students: Update<Student>[] }) { }
}

export class DeleteStudent implements Action {
  readonly type = StudentActionTypes.DeleteStudent;

  constructor(public payload: { id: string }) { }
}

export class DeleteStudents implements Action {
  readonly type = StudentActionTypes.DeleteStudents;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearStudents implements Action {
  readonly type = StudentActionTypes.ClearStudents;
}

export class SetCurrentStudent implements Action {
  readonly type = StudentActionTypes.SetCurrentStudent;
  constructor(public payload: { id: string }) { }
}

export type StudentActions =
  LoadStudents
  | LoadStudentsSuccess
  | LoadStudentsFailure
  | AddStudent
  | AddStudentSuccess
  | AddStudentFailure
  | UpsertStudent
  | AddStudents
  | UpsertStudents
  | UpdateStudent
  | UpdateStudents
  | DeleteStudent
  | DeleteStudents
  | ClearStudents
  | SetCurrentStudent;