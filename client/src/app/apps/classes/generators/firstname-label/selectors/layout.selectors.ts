import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/layout.reducer';
import { getFeatureState } from './utils';

export const getState = createSelector(getFeatureState, state => state.layout);

export const getLoaded = createSelector(getState, state => state.loaded);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getState);
