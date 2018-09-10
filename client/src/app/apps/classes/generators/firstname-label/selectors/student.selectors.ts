import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/student.reducer';
import { getFeatureState } from './utils';

export const getState = createSelector(getFeatureState, state => state.student);

export const getLoaded = createSelector(getState, state => state.loaded);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getState);

export const getSelectedIds = createSelector(getState, state => state.selectedIds);

export const getSelectedStudents = createSelector(
  selectEntities,
  getSelectedIds,
  (entities, selectedIds) => selectedIds.map((id) => entities[id])
);
