import { Action } from '@ngrx/store';

export enum TrombinoscopeActionTypes {
  Generate = '[Trombinoscope] Generate',
  GenerateSuccess = '[Trombinoscope] Generate Success',
  GenerateFailure = '[Trombinoscope] Generate Failure',
}

export class Generate implements Action {
  readonly type = TrombinoscopeActionTypes.Generate;
}
export class GenerateSuccess implements Action {
  readonly type = TrombinoscopeActionTypes.GenerateSuccess;
}
export class GenerateFailure implements Action {
  readonly type = TrombinoscopeActionTypes.GenerateFailure;
}

export type TrombinoscopeActions
 = Generate
 | GenerateSuccess
 | GenerateFailure;
