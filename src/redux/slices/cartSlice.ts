import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


export type cartItem = {
    brand: string,
    category: string,
    createdAt: any,
    description: string,
    id: string,
    imageURLs: string[],
    name: string,
    price: number,
    count: number
}

interface ICart {
    items: cartItem[],
    itemsNumber: number,
    itemsValue: number,
    previousURL: string
}

let initialState: ICart = {
    items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') as any) : [],
    itemsNumber: 0,
    itemsValue: 0,
    previousURL: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<cartItem>) => {
            const findItem = state.items.find((item) => item.id === action.payload.id)
            if (findItem && findItem.count) {
                findItem.count++
                toast.info(`${action.payload.name} was increased in cart`, {
                    position: 'bottom-left'
                })
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
                toast.success(`${action.payload.name} was added to cart`, {
                    position: 'bottom-left'
                })

            }
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        decreaseProductInCart: (state, action: PayloadAction<cartItem>) => {
            const findItem = state.items.find((item) => item.id === action.payload.id)
            if (findItem) {
                findItem.count--
                toast.info(`${action.payload.name} was decreased in cart`, {
                    position: 'bottom-left'
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeProductFromCart: (state, action:PayloadAction<cartItem>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
            toast.success(`${action.payload.name} was removed from cart`, {
                position: 'top-right'
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        clearCart: (state) => {
            state.items = []
            toast.success(`Cart was cleared`, {
                position: 'top-right'
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        calculateTotalPrice: (state) => {
            const initialValue = 0;
            state.itemsValue = state.items.reduce((previousValue: number, currentValue) => {
                return previousValue + (currentValue.price * currentValue.count)
            }, initialValue);
        },
        calculateTotalCountOfProducts: (state) => {
            const initialValue = 0;
            state.itemsNumber = state.items.reduce((previousValue: number, currentValue) => {
                return previousValue + currentValue.count
            }, initialValue);
        },
        saveLastURL: (state, action) => {
            state.previousURL = action.payload
        }


    }
})

export const {addProductToCart, decreaseProductInCart, removeProductFromCart, clearCart, calculateTotalPrice, calculateTotalCountOfProducts, saveLastURL} = cartSlice.actions

export default cartSlice.reducer