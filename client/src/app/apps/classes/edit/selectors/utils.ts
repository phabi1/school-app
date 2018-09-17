import { createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers';

export const getFeatureState = createFeatureSelector<State>('classesEdit');
