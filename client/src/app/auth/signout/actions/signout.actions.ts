import { Action } from '@ngrx/store';

export enum SignoutActionTypes {
  Signout = '[Signout] Signout',
  SignoutSuccess = '[Signout] Signout Success',
  SignoutFailure = '[Signout] Signout Failure',
}

export class Signout implements Action {
  readonly type = SignoutActionTypes.Signout;
}
export class SignoutSuccess implements Action {
  readonly type = SignoutActionTypes.SignoutSuccess;
}
export class SignoutFailure implements Action {
  readonly type = SignoutActionTypes.SignoutFailure;
  constructor(public payload: { error: any }) { }
}

export type SignoutActions
  = Signout
  | SignoutSuccess
  | SignoutFailure;
