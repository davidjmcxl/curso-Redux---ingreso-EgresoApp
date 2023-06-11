import { createReducer, on } from '@ngrx/store';
import { setItem,unSetItem } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
   items:[],
}

export const _ingresoEgresoReducer = createReducer(initialState,

    on(setItem,(state,{items})=>({
        ...state,items:[...items]
    })),
    on(unSetItem,(state)=>({
        ...state,items:[]
    })),

);


