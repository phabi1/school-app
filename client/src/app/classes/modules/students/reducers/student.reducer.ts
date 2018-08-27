import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../models/student.model';
import { StudentActions, StudentActionTypes } from '../actions/student.actions';

export interface State extends EntityState<Student> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: StudentActions
): State {
  switch (action.type) {
    case StudentActionTypes.AddStudent: {
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
      return adapter.addAll(action.payload.students, state);
    }

    case StudentActionTypes.ClearStudents: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
