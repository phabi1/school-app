import { Action } from '@ngrx/store';
import { SigninActions, SigninActionTypes } from '../actions/signin.actions';

export interface State {
  processing: boolean;
  error: any;
}

export const initialState: State = {
  processing: false,
  error: null,
};

export function reducer(state = initialState, action: SigninActions): State {
  switch (action.type) {

    case SigninActionTypes.Signin:
      return {...state, processing: true, error: null};
    case SigninActionTypes.SigninSuccess:
      return {...state, processing: false};
    case SigninActionTypes.SigninFailure:
      return {...state, processing: false, error: action.payload.error};


    default:
      return state;
  }
}
