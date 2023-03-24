import {createSlice} from "@reduxjs/toolkit";

interface IOrderSlice {
    ordersHistory: any[]
}


let initialState: IOrderSlice = {
    ordersHistory: []
}


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrdersHistory: (state, action) => {
            console.log(action.payload)
            state.ordersHistory = action.payload
        }
    }
})

export const { setOrdersHistory } = orderSlice.actions
export default orderSlice.reducer