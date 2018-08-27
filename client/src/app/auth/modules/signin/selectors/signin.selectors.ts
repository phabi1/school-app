import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/signin.reducer';

export const getState = createFeatureSelector<State>('signin');

export const getProcessing = createSelector(getState, state => state.processing);
