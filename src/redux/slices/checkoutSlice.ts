import {createSlice} from "@reduxjs/toolkit"



interface ICheckoutSlice {
    billingData: any
}


const initialState: ICheckoutSlice = {
    billingData: {}
}



export const checkoutSlice = createSlice({
    name: 'checkoutSlice',
    initialState,
    reducers: {
        setBillingData: (state, action) => {
            console.log(action.payload)
        },
    },
})

export const { setBillingData } = checkoutSlice.actions
export default checkoutSlice.reducer