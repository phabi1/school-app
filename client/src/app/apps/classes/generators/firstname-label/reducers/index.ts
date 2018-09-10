import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from './layout.reducer';
import * as fromStudent from './student.reducer';
import * as fromForm from './form.reducer';
import * as fromGrade from './grade.reducer';

export interface State {
  layout: fromLayout.State;
  student: fromStudent.State;
  form: fromForm.State;
  grade: fromGrade.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  student: fromStudent.reducer,
  form: fromForm.reducer,
  grade: fromGrade.reducer,
};
