import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/class.reducer';

export const getFeatureState = createFeatureSelector<State>('class');

export const getCurrentClassId = createSelector(getFeatureState, state => state.currentClassId);
