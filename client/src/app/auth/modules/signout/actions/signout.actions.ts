import { Action } from '@ngrx/store';

export enum SignoutActionTypes {
  LoadSignouts = '[Signout] Load Signouts'
}

export class LoadSignouts implements Action {
  readonly type = SignoutActionTypes.LoadSignouts;
}

export type SignoutActions = LoadSignouts;
