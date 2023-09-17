import React, {FormEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import loginPicture from '../assets/img/login.png'
import ShowPassword from '../components/MiniComponents/ShowPassword';
import ShadowWrapper from "../components/MiniComponents/ShadowWrapper";
import AuthWithGoogle from "../components/AuthWithGoogle";
import Loader from "../components/MiniComponents/Loader";
import {toast} from "react-toastify";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebaseConfig";
import {useRedirectToCart} from "../hooks/useRedirectToCart";

const Login = () => {


    const [passwordIsShow, setPasswordIsShow] = useState(false)

    const redirectToCart = useRedirectToCart('/cart', '/cart')


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        loading: false
    })

    const {email, password, loading} = formData

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setFormData({
            ...formData,
            loading: true
        })
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)

            if (result.user) {
                toast.success('You signed in')
                redirectToCart()
            }



        } catch (e: any) {
            toast.error(e.message)

        } finally {
            setFormData({
                ...formData,
                loading: false
            })
        }
    }







    if (loading) {
        return <Loader/>
    }

    return (
        <section className={'max-w-[1280px] mx-auto flex-auto flex items-center justify-center gap-[30px] max-[970px]:gap-2 pt-20 max-[430px]:mx-1.5'}>
            <div className={`max-[800px]:hidden`}>
                <img src={loginPicture} alt="" className={`w-[450px] max-[970px]:w-[350px]`}/>
            </div>
            <ShadowWrapper>


                <div>
                    <h2 className={'text-center text-[44px] font-bold mb-4'}>Login</h2>
                    <form className={'flex flex-col items-center max-[430px]:w-[320px] max-[360px]:w-[290px]'} onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder={'Email'} required value={email} onChange={handleChange}
                               className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                   'border-gray-300 outline-none focus:border-blue-500 mb-[12px] max-[430px]:w-full'}/>
                        <div className={'relative max-[430px]:w-full'}>
                            <input type={passwordIsShow ? 'text' : 'password'} name="password" required placeholder={'Password'} value={password}
                                   onChange={handleChange}
                                   className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                       'border-gray-300 outline-none focus:border-blue-500 mb-[12px] max-[430px]:w-full'}/>
                            <ShowPassword passwordIsShow={passwordIsShow} setPasswordIsShow={setPasswordIsShow}/>
                        </div>

                        <div className={'flex justify-between w-full text-[14px] mb-3 max-[430px]:flex-col max-[430px]:items-center'}>
                            <div>
                                <span className={'mr-[5px]'}>Don't have an account?</span>
                                <Link className={'text-red-600 cursor-pointer'} to={'/register'}>Register</Link>
                            </div>
                            <div>
                                <Link className={'text-blue-600 cursor-pointer '} to={'/forgot-password'}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <button className={'bg-green-500 p-[10px] rounded-[5px] w-full text-[26px] text-white ' +
                            'max-[970px]:p-[6px] hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg ' +
                            'active:shadow-lg transition duration-300 ease-in-out mb-3 max-[430px]:text-[22px]'}>
                            Login
                        </button>
                        <div className={'gap-[20px] w-full flex items-center before:border-b before:flex-1 ' +
                            'before:border-gray-400 after:border-b after:flex-1 after:border-gray-400 mb-3'}>
                            <p>OR</p>
                        </div>
                        <AuthWithGoogle/>

                    </form>
                </div>
            </ShadowWrapper>
        </section>
    );
};

export default Login;