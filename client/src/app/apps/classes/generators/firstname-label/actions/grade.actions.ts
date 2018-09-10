import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Grade } from '../models/grade.model';

export enum GradeActionTypes {
  LoadGrades = '[Grade] Load Grades',
  LoadGradesSuccess = '[Grade] Load Grades Success',
  LoadGradesFailure = '[Grade] Load Grades Failure',
  ClearGrades = '[Grade] Clear Grades',
  SelectGrade = '[Grade] Select Grade',
  DeselectGrade = '[Grade] Deselect Grade',
}

export class LoadGrades implements Action {
  readonly type = GradeActionTypes.LoadGrades;
}
export class LoadGradesSuccess implements Action {
  readonly type = GradeActionTypes.LoadGradesSuccess;

  constructor(public payload: { grades: Grade[] }) { }
}
export class LoadGradesFailure implements Action {
  readonly type = GradeActionTypes.LoadGradesFailure;

  constructor(public payload: { error: any }) { }
}

export class SelectGrade implements Action {
  readonly type = GradeActionTypes.SelectGrade;
  constructor(public payload: { id: string }) { }
}

export class DeselectGrade implements Action {
  readonly type = GradeActionTypes.DeselectGrade;
  constructor(public payload: { id: string }) { }
}

export class ClearGrades implements Action {
  readonly type = GradeActionTypes.ClearGrades;
}

export type GradeActions =
  LoadGrades
  | LoadGradesSuccess
  | LoadGradesFailure
  | SelectGrade
  | DeselectGrade
  | ClearGrades;
