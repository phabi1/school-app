import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/profile.reducer';

export const getState = createFeatureSelector<State>('profile');

export const getLoading = createSelector(getState, state => state.refreshing);
export const getData = createSelector(getState, state => state.data);
