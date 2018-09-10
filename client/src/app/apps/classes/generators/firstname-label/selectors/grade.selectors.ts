import { adapter } from '../reducers/grade.reducer';
import { createSelector } from '@ngrx/store';
import { getFeatureState } from './utils';

export const getState = createSelector(getFeatureState, state => state.grade);

export const getLoaded = createSelector(getState, state => state.loaded);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getState);
