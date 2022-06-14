import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {filterReducer} from "./slices/filterSlice";

const rootReducer = combineReducers({
    filter: filterReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootStateType = ReturnType<typeof rootReducer>