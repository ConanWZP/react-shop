import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IProducts {
    products: any[]
}

let initialState: IProducts = {
    products: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        saveProducts: (state, action:PayloadAction<any[]>) => {
            console.log(action.payload)
        }
    }
})

export const { saveProducts } = productSlice.actions
export default productSlice.reducer