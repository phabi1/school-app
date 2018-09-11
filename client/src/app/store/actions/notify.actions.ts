import { Action } from '@ngrx/store';

export enum NotifyActionTypes {
  Notify = '[Notify] Notify',
}

export class Notify implements Action {
  readonly type = NotifyActionTypes.Notify;
  constructor(public payload: {
    message: string,
    type?: string,
  }) {
    this.payload.type = this.payload.type || 'error';
  }
}

export type NotifyActions = Notify;
