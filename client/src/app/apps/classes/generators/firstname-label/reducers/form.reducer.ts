import { Action } from '@ngrx/store';
import { FormActionTypes } from '../actions/form.actions';


export interface State {
  generating: boolean;
}

export const initialState: State = {
  generating: false,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case FormActionTypes.Generate:
      return { ...state, generating: true };
    case FormActionTypes.GenerateSuccess:
      return { ...state, generating: false };
    case FormActionTypes.GenerateFailure:
      return { ...state, generating: false };
    default:
      return state;
  }
}
