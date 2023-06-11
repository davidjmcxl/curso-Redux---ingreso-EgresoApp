import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItem = createAction('[IngresoEgreso] set Items',
props<{items:IngresoEgreso[]}>()
);
export const unSetItem = createAction('[IngresoEgreso] unSet Items');
