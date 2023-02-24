import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../components/Admin/ListGoods";


export interface ProductSlice {
    products: IProduct[]
}


let initialState: ProductSlice = {
    products: []
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        saveProducts: (state, action:PayloadAction<IProduct[]>) => {
            console.log(action.payload)
            state.products = action.payload
        }
    }
})

export const { saveProducts } = productSlice.actions
export default productSlice.reducer