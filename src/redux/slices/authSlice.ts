import {createSlice, PayloadAction} from "@reduxjs/toolkit"




export interface IAuthSlice {
    isAuth: boolean,
    email: string | null,
    userName: string | null,
    userID: string | null,
    loading: boolean,
    avatar: string

}


const initialState: IAuthSlice = {
    isAuth: false,
    email: null,
    userID: null,
    userName: null,
    loading: true,
    avatar: ''
}




export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<Omit<IAuthSlice, "loading">>) => {
            const {email, userName, userID, isAuth, avatar} = action.payload
            state.isAuth = isAuth
            state.email = email
            state.userName = userName
            state.userID = userID
            state.avatar = avatar
        },
        setChangeAvatar: (state, action) => {
          state.avatar = action.payload
        },
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

    },
})

export const { setCurrentUser, setChangeAvatar, setAuthLoading } = authSlice.actions
export default authSlice.reducer