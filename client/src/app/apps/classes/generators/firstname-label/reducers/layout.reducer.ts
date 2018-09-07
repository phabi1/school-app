import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Layout } from '../models/layout.model';
import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';

export interface State extends EntityState<Layout> {
  loaded: boolean;
}

export const adapter: EntityAdapter<Layout> = createEntityAdapter<Layout>();

export const initialState: State = adapter.getInitialState({
  loaded: false
});

export function reducer(
  state = initialState,
  action: LayoutActions
): State {
  switch (action.type) {

    case LayoutActionTypes.LoadLayoutsSuccess: {
      state = adapter.addAll(action.payload.layouts, state);
      return { ...state, loaded: true };
    }

    case LayoutActionTypes.ClearLayouts: {
      state = adapter.removeAll(state);
      return { ...state, loaded: false };
    }

    default: {
      return state;
    }
  }
}
