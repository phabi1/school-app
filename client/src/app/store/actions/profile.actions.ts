import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  Refresh = '[Profile] Refresh',
  Refreshed = '[Profile] Refreshed',
}

export class Refresh implements Action {
  readonly type = ProfileActionTypes.Refresh;
}
export class Refreshed implements Action {
  readonly type = ProfileActionTypes.Refreshed;
  constructor(public payload: { data: any }) { }
}

export type ProfileActions
  = Refresh
  | Refreshed;
