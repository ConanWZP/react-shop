import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {doc, getDoc, setDoc, Timestamp} from 'firebase/firestore';
import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {auth, database} from "../firebaseConfig";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {setCurrentUser} from "../redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../hooks/customHooks";
import {useRedirectToCart} from "../hooks/useRedirectToCart";

const AuthWithGoogle = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const redirectToCart = useRedirectToCart('/cart', '/cart')

    const authWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            // The signed-in user info.
            const user = result.user;

            const docSnap = await getDoc(doc(database, 'users', user.uid))
            if (!docSnap.exists()) {
                await setDoc(doc(database, 'users', user.uid), {
                    uid: result.user.uid,
                    name: user.displayName,
                    email: user.email,
                    createdAt: Timestamp.fromDate(new Date()),
                    avatar: ''
                })

                toast.success('You signed up')
            } else {
                toast.success('You signed in')
            }

            dispatch(setCurrentUser({
                email: user.email,
                userName: user.displayName,
                userID: result.user.uid,
                isAuth: true,
                avatar: ''
            }))
            redirectToCart()


        } catch (e: any) {
            toast.error(e.message)
        }


    }


    return (
        <button type={'button'} onClick={authWithGoogle}
                className={'bg-red-500 p-[10px] rounded-[5px] w-full text-[26px] text-white ' +
                    'max-[960px]:p-[6px] flex items-center justify-center gap-[5px] hover:bg-red-600 ' +
                    'active:bg-red-700 shadow-md hover:shadow-lg active:shadow-lg transition duration-300 ease-in-out max-[430px]:text-[22px]'}>
            <FcGoogle className={'bg-white rounded-[50%] d'}/>
            Continue with Google
        </button>
    );
};

export default AuthWithGoogle;