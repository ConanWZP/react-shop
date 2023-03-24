import {combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import productSlice from "./slices/productSlice";
import filtersSlice from "./slices/filtersSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";




const  rootReduce = combineReducers({
    auth: authSlice,
    product: productSlice,
    filters: filtersSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
    order: orderSlice,

})


export const store = configureStore({
    reducer: rootReduce,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch