import { Action } from '@ngrx/store';
import { MonthPyramidActions, MonthPyramidActionTypes } from '../actions/month-pyramid.actions';

export interface State {
  generating: boolean;
  error: any;
}

export const initialState: State = {
  generating: false,
  error: null
};

export function reducer(state = initialState, action: MonthPyramidActions): State {
  switch (action.type) {

    case MonthPyramidActionTypes.Generate:
      return {...state, generating: true, error: null};
    case MonthPyramidActionTypes.GenerateSuccess:
      return {...state, generating: false};
    case MonthPyramidActionTypes.GenerateFailure:
      return {...state, generating: false, error: action.payload.error};

    default:
      return state;
  }
}
