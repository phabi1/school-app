import { Action } from '@ngrx/store';

export enum MonthPyramidActionTypes {
  Generate = '[MonthPyramid] Generate',
  GenerateSuccess = '[MonthPyramid] Generate Success',
  GenerateFailure = '[MonthPyramid] Generate Failure',
}

export class Generate implements Action {
  readonly type = MonthPyramidActionTypes.Generate;
}
export class GenerateSuccess implements Action {
  readonly type = MonthPyramidActionTypes.GenerateSuccess;
}
export class GenerateFailure implements Action {
  readonly type = MonthPyramidActionTypes.GenerateFailure;
  constructor(public payload: { error: any }) { }
}

export type MonthPyramidActions
  = Generate
  | GenerateSuccess
  | GenerateFailure;
