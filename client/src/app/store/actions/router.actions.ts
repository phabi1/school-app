import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  Go = '[Router] Go'
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;
  constructor (public payload: {path: any[], queryParams?: any}) {}
}

export type RouterActions = Go;
