import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../models/student.model';
import { StudentActions, StudentActionTypes } from '../actions/student.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<Student> {
  loading: boolean;
  loaded: boolean;
  currentStudentId?: string;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export function reducer(
  state = initialState,
  action: StudentActions
): State {
  switch (action.type) {
    case StudentActionTypes.AddStudentSuccess: {
      return adapter.addOne(action.payload.student, state);
    }

    case StudentActionTypes.UpsertStudent: {
      return adapter.upsertOne(action.payload.student, state);
    }

    case StudentActionTypes.AddStudents: {
      return adapter.addMany(action.payload.students, state);
    }

    case StudentActionTypes.UpsertStudents: {
      return adapter.upsertMany(action.payload.students, state);
    }

    case StudentActionTypes.UpdateStudent: {
      return adapter.updateOne(action.payload.student, state);
    }

    case StudentActionTypes.UpdateStudents: {
      return adapter.updateMany(action.payload.students, state);
    }

    case StudentActionTypes.DeleteStudent: {
      return adapter.removeOne(action.payload.id, state);
    }

    case StudentActionTypes.DeleteStudents: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case StudentActionTypes.LoadStudents: {
      return { ...state, loading: true, loaded: false };
    }
    case StudentActionTypes.LoadStudentsSuccess: {
      state = adapter.addAll(action.payload.students, state);
      return { ...state, loading: false, loaded: true };
    }

    case StudentActionTypes.ClearStudents: {
      return adapter.removeAll(state);
    }

    case StudentActionTypes.SetCurrentStudent: {
      return { ...state, currentStudentId: action.payload.id };
    }

    default: {
      return state;
    }
  }
}