import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Grade } from '../models/grade.model';
import { GradeActions, GradeActionTypes } from '../actions/grade.actions';

export interface State extends EntityState<Grade> {
  loaded: boolean;
}

export const adapter: EntityAdapter<Grade> = createEntityAdapter<Grade>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
});

export function reducer(
  state = initialState,
  action: GradeActions
): State {
  switch (action.type) {

    case GradeActionTypes.LoadGradesSuccess: {
      state = adapter.addAll(action.payload.grades, state);
      return { ...state, loaded: true };
    }

    case GradeActionTypes.ClearGrades: {
      state = adapter.removeAll(state);
      return { ...state, loaded: false };
    }

    case GradeActionTypes.SelectGrade: {
      return adapter.updateOne({ id: action.payload.id, changes: { selected: true } }, state);
    }

    case GradeActionTypes.DeselectGrade: {
      return adapter.updateOne({ id: action.payload.id, changes: { selected: false } }, state);
    }

    default: {
      return state;
    }
  }
}
