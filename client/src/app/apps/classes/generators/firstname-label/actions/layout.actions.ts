import { Action } from '@ngrx/store';
import { Layout } from '../models/layout.model';

export enum LayoutActionTypes {
  LoadLayouts = '[Firstname Label] Load Layouts',
  LoadLayoutsSuccess = '[Firstname Label] Load Layouts Success',
  LoadLayoutsFailure = '[Firstname Label] Load Layouts Failure',
  ClearLayouts = '[Firstname Label] Clear Layouts'
}

export class LoadLayouts implements Action {
  readonly type = LayoutActionTypes.LoadLayouts;
}

export class LoadLayoutsSuccess implements Action {
  readonly type = LayoutActionTypes.LoadLayoutsSuccess;

  constructor(public payload: { layouts: Layout[] }) { }
}

export class LoadLayoutsFailure implements Action {
  readonly type = LayoutActionTypes.LoadLayoutsFailure;

  constructor(public payload: { error: any }) { }
}

export class ClearLayouts implements Action {
  readonly type = LayoutActionTypes.ClearLayouts;
}

export type LayoutActions =
  LoadLayouts
  | LoadLayoutsSuccess
  | LoadLayoutsFailure
  | ClearLayouts;
