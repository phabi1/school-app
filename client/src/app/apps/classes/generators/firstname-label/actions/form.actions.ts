import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FormActionTypes {
  Generate = '[Firstname Label] Generate',
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

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FirstnameLabelActions
  = Generate;
