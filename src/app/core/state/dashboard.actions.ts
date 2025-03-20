import { createAction, props } from '@ngrx/store';

export const setMetric = createAction(
  '[Dashboard] Set Metric',
  props<{ metric: string }>()
);
