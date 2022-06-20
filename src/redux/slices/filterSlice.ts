import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: FilterInitialStateType = {
    categoryId: 0,
    currentPage: 1,
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
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<any>) {
            state.sort.sortProperty = action.payload.sort.sortProperty
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        }
    }
})

export const filterReducer = filterSlice.reducer
export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions

export type FilterInitialStateType = {
    categoryId: number
    currentPage: number
    sort: SortType
}
export type SortType = {
    name: string
    sortProperty: string
}