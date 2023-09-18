import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type billingDataType = {
    country: string,
    state: string,
    city: string,
    line: string,
    zipCode?: string
    name: string,
    lat: number,
    long: number,
    phone: string,
    generalAddress: string
}

interface ICheckoutSlice {
    billingData: billingDataType
}


const initialState: ICheckoutSlice = {
    billingData: {
        country: '',
        state: '',
        city: '',
        line: '',
        generalAddress: '',
        zipCode: '',
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
        setBillingData: (state, action: PayloadAction<billingDataType>) => {
            console.log(action.payload)
            state.billingData = action.payload
        },
    },
})

export const { setBillingData } = checkoutSlice.actions
export default checkoutSlice.reducer