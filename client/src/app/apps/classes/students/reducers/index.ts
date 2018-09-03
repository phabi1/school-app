import { ActionReducerMap } from '@ngrx/store';
import * as fromStudents from './student.reducer';
import * as fromLevel from './level.reducer';

export interface State {
  students: fromStudents.State;
  levels: fromLevel.State;

}

export const reducers: ActionReducerMap<State> = {
  students: fromStudents.reducer,
  levels: fromLevel.reducer,
};

