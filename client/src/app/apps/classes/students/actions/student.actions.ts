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
  UpdateStudentSuccess = '[Student] Update Student Success',
  UpdateStudentFailure = '[Student] Update Student Failure',
  UpdateStudents = '[Student] Update Students',
  DeleteStudent = '[Student] Delete Student',
  DeleteStudents = '[Student] Delete Students',
  DeleteStudentsSuccess = '[Student] Delete Students Success',
  DeleteStudentsFailure = '[Student] Delete Students Failure',
  ClearStudents = '[Student] Clear Students',
  SetCurrentStudent = '[Student] Set Current Student',
  SetSearchText = '[Student] Set Search Text',
  ShowAddForm = '[Student] Show Add Form',
  ShowUpdateForm = '[Student] Show Update Form',
  ConfirmDeleteStudents = '[Student] Confirm Delete Students',
  SelectAllStudents = '[Student] Select All Students',
  DeselectAllStudents = '[Student] Deselect All Students',
  ToggleSelectionStudent = '[Student] Toggle Selection Student',
}

export class ShowAddForm implements Action {
  readonly type = StudentActionTypes.ShowAddForm;
  constructor(public payload: { student: Student }) { }
}

export class ShowUpdateForm implements Action {
  readonly type = StudentActionTypes.ShowUpdateForm;
  constructor(public payload: { student: Student }) { }
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

  constructor(public payload: { id: string, data: any }) { }
}
export class UpdateStudentSuccess implements Action {
  readonly type = StudentActionTypes.UpdateStudentSuccess;

  constructor(public payload: { student: Update<Student> }) { }
}
export class UpdateStudentFailure implements Action {
  readonly type = StudentActionTypes.UpdateStudentFailure;

  constructor(public payload: { error: any }) { }
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
export class DeleteStudentsSuccess implements Action {
  readonly type = StudentActionTypes.DeleteStudentsSuccess;

  constructor(public payload: { ids: string[] }) { }
}
export class DeleteStudentsFailure implements Action {
  readonly type = StudentActionTypes.DeleteStudentsFailure;

  constructor(public payload: { error: any }) { }
}

export class ClearStudents implements Action {
  readonly type = StudentActionTypes.ClearStudents;
}

export class SetCurrentStudent implements Action {
  readonly type = StudentActionTypes.SetCurrentStudent;
  constructor(public payload: { id: string }) { }
}

export class SetSearchText implements Action {
  readonly type = StudentActionTypes.SetSearchText;
  constructor(public payload: { text: string }) { }
}

export class ConfirmDeleteStudents implements Action {
  readonly type = StudentActionTypes.ConfirmDeleteStudents;
  constructor(public payload: { students: Student[] }) { }
}

export class SelectAllStudents implements Action {
  readonly type = StudentActionTypes.SelectAllStudents;
}

export class DeselectAllStudents implements Action {
  readonly type = StudentActionTypes.DeselectAllStudents;
}

export class ToggleSelectionStudent implements Action {
  readonly type = StudentActionTypes.ToggleSelectionStudent;
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
  | UpdateStudentSuccess
  | UpdateStudentFailure
  | UpdateStudents
  | DeleteStudent
  | DeleteStudents
  | DeleteStudentsSuccess
  | DeleteStudentsFailure
  | ClearStudents
  | SetCurrentStudent
  | SetSearchText
  | ShowAddForm
  | ShowUpdateForm
  | ConfirmDeleteStudents
  | SelectAllStudents
  | DeselectAllStudents
  | ToggleSelectionStudent;
