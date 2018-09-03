import { adapter } from '../reducers/level.reducer';
import { createSelector } from '@ngrx/store';
import { getFeatureState } from './utils';

export const getState = createSelector(getFeatureState, state => state.levels);

export const getLoaded = createSelector(getState, state => state.loaded);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getState);
