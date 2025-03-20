import { createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectMetric = (state: { dashboard: DashboardState }) =>
  state.dashboard.metric;
