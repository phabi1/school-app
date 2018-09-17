import { FuseUtils } from '@fuse/utils';
import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/student.reducer';
import { getFeatureState } from './utils';
import { map } from 'rxjs/operators';

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

export const getSelectedStudentIds = createSelector(getState, state => state.selectedStudentIds);

export const getSelectedStudents = createSelector(selectEntities, getSelectedStudentIds, (entities, selectedStudentIds) => {
  return selectedStudentIds.map((id) => entities[id]);
});

export const getSearchText = createSelector(getState, state => state.searchText);

export const getDisplayName = createSelector(getState, state => state.displayName);

export const getStudentResults = createSelector(selectEntities, getSearchText, (entities, searchText) => {
  return FuseUtils.filterArrayByString(Object.keys(entities).map((id) => entities[id]), searchText);
});
