import { Action } from '@ngrx/store';
import { Grade } from '../models/grade.model';

export enum GradeActionTypes {
  LoadGrades = '[Grade] Load Grades',
  LoadGradesSuccess = '[Grade] Load Grades Success',
  LoadGradesFailure = '[Grade] Load Grades Failure',
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



export type GradeActions =
  LoadGrades
  | LoadGradesSuccess
  | LoadGradesFailure;
