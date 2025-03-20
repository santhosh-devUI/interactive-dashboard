import { createReducer, on } from '@ngrx/store';
import { setMetric } from './dashboard.actions';

export interface DashboardState {
  metric: string;
}

export const intialState: DashboardState = {
  metric: 'sales',
};

export const dashboardReducer = createReducer(
  intialState,
  on(setMetric, (state, { metric }) => ({ ...state, metric }))
);
