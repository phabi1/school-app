import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from './layout.reducer';
import * as fromStudent from './student.reducer';
import * as fromForm from './form.reducer';

export interface State {
  layout: fromLayout.State;
  student: fromStudent.State;
  form: fromForm.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  student: fromStudent.reducer,
  form: fromForm.reducer,
};
