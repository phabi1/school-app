import { Action } from '@ngrx/store';
import { SignoutActions, SignoutActionTypes } from '../actions/signout.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: SignoutActions): State {
  switch (action.type) {

    case SignoutActionTypes.LoadSignouts:
      return state;


    default:
      return state;
  }
}
