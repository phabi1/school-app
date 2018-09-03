import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Level } from '../models/level.model';
import { LevelActions, LevelActionTypes } from '../actions/level.actions';

export interface State extends EntityState<Level> {
  loaded: boolean;
}

export const adapter: EntityAdapter<Level> = createEntityAdapter<Level>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
});

export function reducer(
  state = initialState,
  action: LevelActions
): State {
  switch (action.type) {

    case LevelActionTypes.LoadLevels: {
      return { ...state, loaded: false };
    }

    case LevelActionTypes.LoadLevelsSuccess: {
      state = adapter.addAll(action.payload.levels, state);
      return { ...state, loaded: true };
    }

    default: {
      return state;
    }
  }
}

