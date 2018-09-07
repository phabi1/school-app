import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../models/student.model';
import { StudentActions, StudentActionTypes } from '../actions/student.actions';

export interface State extends EntityState<Student> {
  loaded: boolean;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  loaded: false
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

    default: {
      return state;
    }
  }
}

