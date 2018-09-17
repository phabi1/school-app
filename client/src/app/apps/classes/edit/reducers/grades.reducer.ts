import { Action } from '@ngrx/store';
import { GradesActions, GradesActionTypes } from '../actions/grades.actions';
import { Grade } from '../models/grade.model';

export interface State {
  loading: boolean;
  loaded: boolean;
  grades: Grade[];
  ids: string[];
  multiple: boolean;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  grades: [],
  ids: [],
  multiple: false,
};

export function reducer(state = initialState, action: GradesActions): State {
  switch (action.type) {

    case GradesActionTypes.Load:
      return { ...state, loading: true, loaded: false };

    case GradesActionTypes.LoadSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        grades: action.payload.grades,
        ids: action.payload.selectedGrades.map((el) => el.id),
        multiple: action.payload.multiple,
      };

    default:
      return state;
  }
}
