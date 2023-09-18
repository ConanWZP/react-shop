import {createSlice} from "@reduxjs/toolkit";

interface IOrderSlice {
    ordersHistory: any[],
    ordersTotalPrice: number,
    ordersHistoryAdmin: any[]
}


let initialState: IOrderSlice = {
    ordersHistory: [],
    ordersTotalPrice: 0,
    ordersHistoryAdmin: []
}


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrdersHistory: (state, action) => {
            console.log(action.payload)
            state.ordersHistory = action.payload
        },
        calculateTotalOrdersPrice: (state, action) => {

                const initialValue = 0;
                state.ordersTotalPrice = action.payload.reduce((previousValue: number, currentValue: any) => {
                    return previousValue + currentValue.orderTotalAmount
                }, initialValue);

        },
        setOrdersHistoryAdmin: (state, action) => {
            state.ordersHistoryAdmin = action.payload
        }
    }
})

export const { setOrdersHistory, calculateTotalOrdersPrice,
    setOrdersHistoryAdmin } = orderSlice.actions
export default orderSlice.reducer