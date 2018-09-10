import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../models/student.model';
import { StudentActions, StudentActionTypes } from '../actions/student.actions';
import { GradeActionTypes, GradeActions } from '../actions/grade.actions';

export interface State extends EntityState<Student> {
  loaded: boolean;
  selectedIds: string[];
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  selectedIds: [],
});

export function reducer(
  state = initialState,
  action: StudentActions
): State {
  switch (action.type) {

    case StudentActionTypes.LoadStudentsSuccess: {
      state = adapter.addAll(action.payload.students, state);
      return { ...state, loaded: true };
    }

    case StudentActionTypes.ClearStudents: {
      state = adapter.removeAll(state);
      return { ...state, loaded: false };
    }

    case StudentActionTypes.SetSelectedStudents: {
      return {...state, selectedIds: [...action.payload.ids]};
    }

    default: {
      return state;
    }
  }
}

