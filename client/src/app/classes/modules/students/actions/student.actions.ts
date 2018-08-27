import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Student } from '../models/student.model';

export enum StudentActionTypes {
  LoadStudents = '[Student] Load Students',
  AddStudent = '[Student] Add Student',
  UpsertStudent = '[Student] Upsert Student',
  AddStudents = '[Student] Add Students',
  UpsertStudents = '[Student] Upsert Students',
  UpdateStudent = '[Student] Update Student',
  UpdateStudents = '[Student] Update Students',
  DeleteStudent = '[Student] Delete Student',
  DeleteStudents = '[Student] Delete Students',
  ClearStudents = '[Student] Clear Students'
}

export class LoadStudents implements Action {
  readonly type = StudentActionTypes.LoadStudents;

  constructor(public payload: { students: Student[] }) {}
}

export class AddStudent implements Action {
  readonly type = StudentActionTypes.AddStudent;

  constructor(public payload: { student: Student }) {}
}

export class UpsertStudent implements Action {
  readonly type = StudentActionTypes.UpsertStudent;

  constructor(public payload: { student: Student }) {}
}

export class AddStudents implements Action {
  readonly type = StudentActionTypes.AddStudents;

  constructor(public payload: { students: Student[] }) {}
}

export class UpsertStudents implements Action {
  readonly type = StudentActionTypes.UpsertStudents;

  constructor(public payload: { students: Student[] }) {}
}

export class UpdateStudent implements Action {
  readonly type = StudentActionTypes.UpdateStudent;

  constructor(public payload: { student: Update<Student> }) {}
}

export class UpdateStudents implements Action {
  readonly type = StudentActionTypes.UpdateStudents;

  constructor(public payload: { students: Update<Student>[] }) {}
}

export class DeleteStudent implements Action {
  readonly type = StudentActionTypes.DeleteStudent;

  constructor(public payload: { id: string }) {}
}

export class DeleteStudents implements Action {
  readonly type = StudentActionTypes.DeleteStudents;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearStudents implements Action {
  readonly type = StudentActionTypes.ClearStudents;
}

export type StudentActions =
 LoadStudents
 | AddStudent
 | UpsertStudent
 | AddStudents
 | UpsertStudents
 | UpdateStudent
 | UpdateStudents
 | DeleteStudent
 | DeleteStudents
 | ClearStudents;
