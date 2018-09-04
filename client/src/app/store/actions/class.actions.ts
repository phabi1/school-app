import { Action } from '@ngrx/store';

export enum ClassActionTypes {
  SetCurrentClass = '[Class] Set Current Class'
}

export class SetCurrentClass implements Action {
  readonly type = ClassActionTypes.SetCurrentClass;
  constructor(public payload: { id: string }) { }
}

export type ClassActions = SetCurrentClass;
