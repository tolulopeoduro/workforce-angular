import { createAction, props } from "@ngrx/store";

export const setData = createAction('setData' , props<any>())
export const clearData = createAction('clearData')