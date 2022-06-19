import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ItemsType>) {
            state.items.push(action.payload)
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id === action.payload)
        },
        clearItems(state) {
            state.items = []
        }
    }
})

export const cartReducer = cartSlice.reducer
export const {addItem, removeItem, clearItems} = cartSlice.actions

export type InitialStateType = {
    totalPrice: number
    items: Array<ItemsType>
}
type ItemsType = {
    id: number
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
}