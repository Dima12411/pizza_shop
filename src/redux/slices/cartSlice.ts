import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: CartInitialStateType = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ItemsType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state, action: PayloadAction<ItemsType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce((min, obj) => {
                return obj.price * obj.count - min
            }, 0 )
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = 0
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const cartReducer = cartSlice.reducer
export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions

export type CartInitialStateType = {
    totalPrice: number
    items: Array<ItemsType>
}
export type ItemsType = {
    id: number
    title: string
    price: number
    imageUrl: string
    count: number
    type: string
    size: number
}