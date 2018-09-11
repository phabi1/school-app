import { Action } from '@ngrx/store';
import { TrombinoscopeActions, TrombinoscopeActionTypes } from '../actions/trombinoscope.actions';

export interface State {
  generating: boolean;
}

export const initialState: State = {
  generating: false
};

export function reducer(state = initialState, action: TrombinoscopeActions): State {
  switch (action.type) {

    case TrombinoscopeActionTypes.Generate:
      return { ...state, generating: true };


    default:
      return state;
  }
}
