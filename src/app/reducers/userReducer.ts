import { createReducer, on } from "@ngrx/store"
import { clearData, setData } from "./userActions"

const initialState : any = {data : {}}

const _userReducer = createReducer(
    initialState,
    on(setData , (state : any , action ) => {
        return {
            ...state,
            data : action.data
        }
    }),
    on(clearData , (state: any) => {
        return {
            ...state,
            data : {}
        }
    })
)

export const userReducer =  (state : any , action : any) => _userReducer(state , action)
