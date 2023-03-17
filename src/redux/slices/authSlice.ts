import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { onAuthStateChanged } from "firebase/auth"
import {doc, getDoc } from "firebase/firestore"
import {auth, database} from "../../firebaseConfig";



interface IAuthSlice {
    isAuth: boolean,
    email: string | null,
    userName: string | null,
    userID: string | null,
    loading: boolean,

}


const initialState: IAuthSlice = {
    isAuth: false,
    email: null,
    userID: null,
    userName: null,
    loading: true,

}

// Работает как надо
/*export const changeStateOnAuth = createAsyncThunk(
    'auth/changeState',
    async (_, thunkAPI) => {

        await onAuthStateChanged(auth, (user) => {

            if (user) {

                const getData = async () => {
                    const docRef = doc(database, 'users', user.uid)
                    const docData = await getDoc(docRef)
                    if (docData.exists()) {
                        console.log(docData.data())
                        thunkAPI.dispatch(setCurrentUser({
                            email: docData.data().email,
                            userName: docData.data().name,
                            userID: docData.data().uid
                        }))
                        thunkAPI.dispatch(setInitialized(true))

                        thunkAPI.dispatch(setLoading(false))
                    } else {
                        thunkAPI.dispatch(setLoading(false))
                    }
                }
                getData()

            } else {
                thunkAPI.dispatch(setLoading(false))
                thunkAPI.dispatch(setInitialized(false))
            }

        })


        return
    }
)*/


export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            console.log(action.payload)
            const {email, userName, userID, isAuth} = action.payload
            state.isAuth = isAuth
            state.email = email
            state.userName = userName
            state.userID = userID
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

    },
})

export const { setCurrentUser, setLoading } = authSlice.actions
export default authSlice.reducer