import React, {FormEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import loginPicture from '../assets/img/login.png'
import ShowPassword from '../components/MiniComponents/ShowPassword';
import ShadowWrapper from "../components/MiniComponents/ShadowWrapper";
import AuthWithGoogle from "../components/AuthWithGoogle";
import Loader from "../components/MiniComponents/Loader";
import {toast} from "react-toastify";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebaseConfig";

const Login = () => {

    const navigate = useNavigate()
    const [passwordIsShow, setPasswordIsShow] = useState(false)


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
                navigate('/')
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
        <section className={'max-w-[1280px] mx-auto flex-auto flex items-center justify-center gap-[30px]'}>
            <div>
                <img src={loginPicture} alt="" width={450}/>
            </div>
            <ShadowWrapper>


                <div>
                    <h2 className={'text-center text-[44px] font-bold mb-4'}>Login</h2>
                    <form className={'flex flex-col'} onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder={'Email'} required value={email} onChange={handleChange}
                               className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                   'border-gray-300 outline-none focus:border-blue-500 mb-[12px]'}/>
                        <div className={'relative'}>
                            <input type={passwordIsShow ? 'text' : 'password'} name="password" required placeholder={'Password'} value={password}
                                   onChange={handleChange}
                                   className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                       'border-gray-300 outline-none focus:border-blue-500 mb-[12px]'}/>
                            <ShowPassword passwordIsShow={passwordIsShow} setPasswordIsShow={setPasswordIsShow}/>
                        </div>

                        <div className={'flex justify-between w-full text-[14px] mb-3'}>
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
                            'max-[960px]:p-[6px] hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg ' +
                            'active:shadow-lg transition duration-300 ease-in-out mb-3'}>
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