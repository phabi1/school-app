import { Action } from '@ngrx/store';
import { SignoutActions, SignoutActionTypes } from '../actions/signout.actions';

export interface State {
  error: any;
}

export const initialState: State = {
  error: null,
};

export function reducer(state = initialState, action: SignoutActions): State {
  switch (action.type) {

    case SignoutActionTypes.SignoutFailure:
      return { ...state, error: action.payload.error };


    default:
      return state;
  }
}
