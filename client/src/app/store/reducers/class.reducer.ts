import { Action } from '@ngrx/store';
import { ClassActions, ClassActionTypes } from '../actions/class.actions';

export interface State {
  currentClassId: string;
}

export const initialState: State = {
  currentClassId: null,
};

export function reducer(state = initialState, action: ClassActions): State {
  switch (action.type) {

    case ClassActionTypes.SetCurrentClass:
      return { ...state, currentClassId: action.payload.id };


    default:
      return state;
  }
}
