import { Action } from '@ngrx/store';
import { Grade } from '../models/grade.model';

export enum GradesActionTypes {
  Load = '[Classes Edit] Grades Load',
  LoadSuccess = '[Classes Edit] Grades Load Success',
  LoadFailure = '[Classes Edit] Grades Load Failure',
}

export class Load implements Action {
  readonly type = GradesActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = GradesActionTypes.LoadSuccess;
  constructor(public payload: {
    grades: Grade[],
    selectedGrades: Grade[],
    multiple: boolean
  }) { }
}

export class LoadFailure implements Action {
  readonly type = GradesActionTypes.LoadFailure;
}

export type GradesActions
  = Load
  | LoadSuccess
  | LoadFailure;
