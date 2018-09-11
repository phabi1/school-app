import { Action } from '@ngrx/store';

export enum TrombinoscopeActionTypes {
  Generate = '[Trombinoscope] Generate'
}

export class Generate implements Action {
  readonly type = TrombinoscopeActionTypes.Generate;
}

export type TrombinoscopeActions = Generate;
