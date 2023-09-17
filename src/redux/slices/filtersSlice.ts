import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types";

type payloadSearch = {
    products: IProduct[],
    searchValue: string
}

type payloadSort = {
    products: IProduct[],
    sortValue: string
}

type payloadCategory = {
    products: IProduct[],
    category: string
}

type payloadBrand = {
    products: IProduct[],
    brand: string
}

type payloadPrice = {
    products: IProduct[],
    price: number
}

interface IFiltersSlice {
    filteredResults: IProduct[],
}


const initialState: IFiltersSlice = {
    filteredResults: [],
}


export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

        searchProducts: (state, action: PayloadAction<payloadSearch>) => {
            const {products, searchValue} = action.payload

            state.filteredResults = products.filter((product: IProduct) => {
                return (
                    product?.name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    product?.category.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    product?.brand.toLowerCase().includes(searchValue.toLowerCase())
                )
            })

        },
        sortProductsBy: (state: any, action: PayloadAction<payloadSort>) => {
            const {products, sortValue} = action.payload

            switch (sortValue) {

                case 'last':
                    let latestProducts = [...products]
                    return {
                        filteredResults: latestProducts.sort((a, b) => {
                            return b.createdAt - a.createdAt
                        }),
                    }

                case 'low-price':

                    let lowPriceProducts = [...products]
                    return {
                        filteredResults: lowPriceProducts.sort((a: any, b: any) => {
                            return a.price - b.price
                        })
                    }
                case 'high-price':

                    let highPriceProducts = [...products]

                    return {
                        filteredResults: highPriceProducts.sort((a: any, b: any) => {
                            return b.price - a.price
                        })
                    }
                case 'a-z':

                    let aZPriceProducts = [...products]

                    return {
                        filteredResults: aZPriceProducts.sort((a: any, b: any) => {
                            return a.name.localeCompare(b.name)
                        })
                    }
                case 'z-a':

                    let zAPriceProducts = [...products]

                    return {
                        filteredResults: zAPriceProducts.sort((a: any, b: any) => {
                            console.log(a, b)
                            return b.name.localeCompare(a.name)
                        })
                    }

                default:
                    return state
            }

        },
        setProductsByCategory: (state, action: PayloadAction<payloadCategory>) => {
            const {products, category} = action.payload

            switch (category) {
                case 'All':
                    return {
                        filteredResults: products,
                    }
                case category:
                    return {
                        filteredResults: products.filter((product: IProduct) => product.category === category)
                    }
                default: return state
            }
        },
        setProductsByBrand: (state, action:PayloadAction<payloadBrand>) => {

            const {products, brand} = action.payload
            switch (brand) {
                case 'All':

                    return {
                        filteredResults: products,
                    }
                case brand:
                    return {
                        filteredResults: products.filter((product: IProduct) => product.brand === brand),
                    }
                default: return state
            }
        },
        setProductsByPrice: (state, action: PayloadAction<payloadPrice>) => {
            const {products, price} = action.payload
            state.filteredResults = products.filter((product: IProduct) => product.price <= price)
        },
        setFilteredResults: (state, action) => {
            state.filteredResults = action.payload
        }

    }
})

export const {searchProducts, sortProductsBy,
    setProductsByCategory, setProductsByBrand,
    setProductsByPrice, setFilteredResults} = filtersSlice.actions

export default filtersSlice.reducer

