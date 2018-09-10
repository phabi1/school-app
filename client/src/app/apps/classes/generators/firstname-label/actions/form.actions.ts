import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FormActionTypes {
  Generate = '[Firstname Label] Generate',
  GenerateSuccess = '[Firstname Label] Generate Success',
  GenerateFailure = '[Firstname Label] Generate Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class Generate implements Action {
  readonly type = FormActionTypes.Generate;

  constructor(public payload: { layout: { type: string, options?: any }, students: string[] }) { }
}

export class GenerateSuccess implements Action {
  readonly type = FormActionTypes.GenerateSuccess;
}

export class GenerateFailure implements Action {
  readonly type = FormActionTypes.GenerateFailure;
  constructor(public payload: { error: any }) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FirstnameLabelActions
  = Generate
  | GenerateSuccess
  | GenerateFailure;
