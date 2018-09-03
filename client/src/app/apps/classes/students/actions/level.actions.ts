import { Action } from '@ngrx/store';
import { Level } from '../models/level.model';

export enum LevelActionTypes {
  LoadLevels = '[Level] Load Levels',
  LoadLevelsSuccess = '[Level] Load Levels Success',
  LoadLevelsFailure = '[Level] Load Levels Failure',
}

export class LoadLevels implements Action {
  readonly type = LevelActionTypes.LoadLevels;
}
export class LoadLevelsSuccess implements Action {
  readonly type = LevelActionTypes.LoadLevelsSuccess;

  constructor(public payload: { levels: Level[] }) { }
}
export class LoadLevelsFailure implements Action {
  readonly type = LevelActionTypes.LoadLevelsFailure;

  constructor(public payload: { error: any }) { }
}



export type LevelActions =
  LoadLevels
  | LoadLevelsSuccess
  | LoadLevelsFailure;
