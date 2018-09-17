import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'environments/environment';
import * as fromGrades from './grades.reducer';
import * as fromGroups from './groups.reducer';

export interface State {
  grades: fromGrades.State;
  groups: fromGroups.State;
}

export const reducers: ActionReducerMap<State> = {
  grades: fromGrades.reducer,
  groups: fromGroups.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
