import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { StudentActions, StudentActionTypes } from '../actions/student.actions';
import { Student } from '../models/student.model';

export interface State extends EntityState<Student> {
  loading: boolean;
  loaded: boolean;
  selectedStudentIds: string[];
  currentStudentId?: string;
  searchText: string;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedStudentIds: [],
  searchText: '',
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

    case StudentActionTypes.UpdateStudentSuccess: {
      return adapter.updateOne(action.payload.student, state);
    }

    case StudentActionTypes.UpdateStudents: {
      return adapter.updateMany(action.payload.students, state);
    }

    case StudentActionTypes.DeleteStudent: {
      return adapter.removeOne(action.payload.id, state);
    }

    case StudentActionTypes.DeleteStudentsSuccess: {
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

    case StudentActionTypes.SetSearchText: {
      return {
        ...state,
        searchText: action.payload.text
      };
    }

    case StudentActionTypes.SelectAllStudents: {
      return { ...state, selectedStudentIds: [...state.ids as string[]] };
    }

    case StudentActionTypes.DeselectAllStudents: {
      return { ...state, selectedStudentIds: [] };
    }

    case StudentActionTypes.ToggleSelectionStudent: {
      let selectedStudentIds: string[] = [...state.selectedStudentIds];
      if (selectedStudentIds.find(id => action.payload.id === id) !== undefined) {
        selectedStudentIds = selectedStudentIds.filter((id) => action.payload.id !== id);
      } else {
        selectedStudentIds.push(action.payload.id);
      }
      return { ...state, selectedStudentIds };
    }

    default: {
      return state;
    }
  }
}
