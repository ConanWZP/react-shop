import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../components/Admin/ListGoods";


export interface ProductSlice {
    products: IProduct[],
    minPrice: number | null,
    maxPrice: number | null,
}


let initialState: ProductSlice = {
    products: [],
    minPrice: null,
    maxPrice: null,
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        saveProducts: (state, action:PayloadAction<IProduct[]>) => {

            console.log(action.payload)
            state.products = action.payload
        },
        savePriceRange: (state, action) => {
            const {products} = action.payload
            console.log(products)
            const productsCopy: number[] = []
            products.map((product: IProduct) => {
                const productPrice = product.price
                return productsCopy.push(productPrice)
            })
            state.minPrice = Math.min(...productsCopy)
            state.maxPrice = Math.max(...productsCopy)
        }
    }
})

export const { saveProducts, savePriceRange } = productSlice.actions
export default productSlice.reducer