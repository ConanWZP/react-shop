import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

interface ICart {
    items: any[],
    itemsNumber: number,
    itemsValue: number
}

let initialState: ICart = {
    items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') as any) : [],
    itemsNumber: 0,
    itemsValue: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const findItemIndex = state.items.find((item) => item.id === action.payload.id)
            if (findItemIndex && findItemIndex.count) {
                findItemIndex.count++
                toast.info(`${action.payload.name} was increased in cart`, {
                    position: 'top-right'
                })
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
                toast.success(`${action.payload.name} was added to cart`, {
                    position: 'top-right'
                })

            }
            localStorage.setItem('cartItems', JSON.stringify(state.items))


        }
    }
})

export const {addProductToCart} = cartSlice.actions

export default cartSlice.reducer