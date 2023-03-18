import {createSlice} from "@reduxjs/toolkit"

type billingDataType = {
    address: string,
    name: string,
    lat: number,
    long: number,
    phone: string
}

interface ICheckoutSlice {
    billingData: billingDataType
}


const initialState: ICheckoutSlice = {
    billingData: {
        address: '',
        phone: '',
        name: '',
        lat: 0,
        long: 0
    }
}



export const checkoutSlice = createSlice({
    name: 'checkoutSlice',
    initialState,
    reducers: {
        setBillingData: (state, action) => {
            console.log(action.payload)
            state.billingData = action.payload
        },
    },
})

export const { setBillingData } = checkoutSlice.actions
export default checkoutSlice.reducer