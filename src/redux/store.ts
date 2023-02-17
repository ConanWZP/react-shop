import {combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'




const  rootReduce = combineReducers({
    auth: authSlice,
})


export const store = configureStore({
    reducer: rootReduce,

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch