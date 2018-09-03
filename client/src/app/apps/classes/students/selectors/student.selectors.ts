import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/student.reducer';
import { getFeatureState } from './utils';

export const getState = createSelector(getFeatureState, state => state.students);

export const getLoaded = createSelector(getState, state => state.loaded);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getState);

export const getCurrentStudentId = createSelector(getState, state => state.currentStudentId);

export const getCurrentStudent = createSelector(getCurrentStudentId, selectEntities, (currentStudentId, entities) => {
  if (!currentStudentId) {
    return null;
  }
  return entities[currentStudentId];
});
