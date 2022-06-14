import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        }
    }
})

export const filterReducer = filterSlice.reducer
export const { setCategoryId, setSort } = filterSlice.actions

export type InitialStateType = {
    categoryId: number
    sort: SortType
}
export type SortType = {
    name: string
    sortProperty: string
}