import { createSelector } from '@ngrx/store';
import { getFeatureState } from './utils';

export const getState = createSelector(getFeatureState, state => state.grades);

export const getLoading = createSelector(getState, state => state.loading);
export const getLoaded = createSelector(getState, state => state.loaded);
export const getGrades = createSelector(getState, state => state.grades);
