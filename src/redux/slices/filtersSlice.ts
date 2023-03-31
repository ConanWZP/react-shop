import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../components/Admin/ListGoods";

interface IFiltersSlice {
    filteredResults: any[],
   // filteredByCategory: any[],
   // filteredByBrand: any[]
}

const initialState: IFiltersSlice = {
    filteredResults: [],
   // filteredByCategory: [],
  //  filteredByBrand: []
}

// product.name.toLowerCase().includes(searchValue.toLowerCase())

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

        searchProducts: (state, action) => {

            const {products, searchValue} = action.payload
           // const searchValue = extraDispatchArg

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
        sortProductsBy: (state: any, action: PayloadAction<any>) => {
            const {products, sortValue} = action.payload


            // latest - is default, because fetching data from firebase making with property - createdAt, desc
          //  state.filteredByCategory = products
              //  state.filteredByBrand = products
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
                       // filteredByBrand: lowPriceProducts,
                        filteredResults: lowPriceProducts.sort((a: any, b: any) => {
                            console.log(a.price, b.price)
                            return a.price - b.price
                        })
                    }
                case 'high-price':

                    let highPriceProducts = [...products]

                    return {
                        filteredResults: highPriceProducts.sort((a: any, b: any) => {
                            console.log(a, b)
                            return b.price - a.price
                        })
                    }
                case 'a-z':

                    let aZPriceProducts = [...products]

                    return {
                        filteredResults: aZPriceProducts.sort((a: any, b: any) => {
                            console.log(a, b)
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
        setProductsByCategory: (state: any, action) => {
            const {products, category} = action.payload

            console.log(products)
            console.log(category)
            switch (category) {
                case 'All':
                    return {
                        filteredResults: products,
                     //   filteredByCategory: products
                    }
                case category:
                    return {
                      //  filteredByCategory: products.filter((product: IProduct) => product.category === category),
                        filteredResults: products.filter((product: IProduct) => product.category === category)
                    }
                default: return state
            }
        },
        setProductsByBrand: (state: any, action) => {

            const {products, brand} = action.payload
            console.log(products)
            console.log(brand, '  brand')
            switch (brand) {
                case 'All':

                    return {
                        filteredResults: products,
                       // filteredByBrand: products,
                      //  filteredByCategory: products
                    }
                case brand:
                    return {
                      //  filteredByCategory: products,
                        filteredResults: products.filter((product: IProduct) => product.brand === brand),
                       // filteredByBrand: products.filter((product: IProduct) => product.brand === brand)
                    }
                default: return state
            }
        },
        setProductsByPrice: (state, action) => {
            const {products, price} = action.payload

            state.filteredResults = products.filter((product: IProduct) => product.price <= price)
        },
        setFilteredResults: (state, action) => {
            state.filteredResults = action.payload
        }

    }
})

export const {searchProducts, sortProductsBy, setProductsByCategory, setProductsByBrand, setProductsByPrice, setFilteredResults} = filtersSlice.actions

export default filtersSlice.reducer

