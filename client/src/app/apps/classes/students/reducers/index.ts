import { ActionReducerMap } from '@ngrx/store';
import * as fromStudents from './student.reducer';
import * as fromGrade from './grade.reducer';

export interface State {
  students: fromStudents.State;
  grades: fromGrade.State;

}

export const reducers: ActionReducerMap<State> = {
  students: fromStudents.reducer,
  grades: fromGrade.reducer,
};

