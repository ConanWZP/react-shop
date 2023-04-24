import React, {FormEvent, useState} from 'react';
import resetPicture from "../assets/img/password.jpg";
import ShadowWrapper from "../components/MiniComponents/ShadowWrapper";
import {Link, useNavigate} from "react-router-dom";
import AuthWithGoogle from "../components/AuthWithGoogle";
import {auth} from "../firebaseConfig";
import { sendPasswordResetEmail } from 'firebase/auth';
import {toast} from "react-toastify";
import Loader from "../components/MiniComponents/Loader";

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, email)
            toast.success('The password was reset')
            navigate('/login')
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <section className={'max-w-[1280px] mx-auto flex-auto flex items-center justify-center gap-[30px]  max-[970px]:gap-2 pt-20 max-[430px]:mx-1.5'}>
            <div className={`max-[800px]:hidden`}>
                <img src={resetPicture} alt="" className={`w-[450px] max-[970px]:w-[350px]`}/>
            </div>
            <ShadowWrapper>


                <div>
                    <h2 className={'text-center text-[44px] font-bold mb-4 max-[500px]:text-[36px]'}>Reset password</h2>
                    <form className={'flex flex-col items-center max-[430px]:w-[320px] max-[360px]:w-[290px]'} onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder={'Email'} required value={email} onChange={(e) => setEmail(e.target.value)}
                               className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                   'border-gray-300 outline-none focus:border-blue-500 mb-[12px] max-[430px]:w-full'} />

                        <div className={'flex justify-between w-full text-[14px] mb-3'}>
                            <div>
                                <span className={'mr-[5px]'}>Don't have an account?</span>
                                <Link className={'text-red-600 cursor-pointer'} to={'/register'}>Register</Link>
                            </div>
                            <div>
                                <Link className={'text-blue-600 cursor-pointer '} to={'/login'}>
                                    Sign in
                                </Link>
                            </div>
                        </div>
                        <button className={'bg-green-500 p-[10px] rounded-[5px] w-full text-[26px] text-white ' +
                            'max-[960px]:p-[6px] hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg ' +
                            'active:shadow-lg transition duration-300 ease-in-out mb-3 max-[430px]:text-[22px]'}>
                            Reset
                        </button>
                        <div className={'gap-[20px] w-full flex items-center before:border-b before:flex-1 ' +
                            'before:border-gray-400 after:border-b after:flex-1 after:border-gray-400 mb-3'}>
                            <p>OR</p>
                        </div>
                        <AuthWithGoogle />

                    </form>
                </div>
            </ShadowWrapper>
        </section>
    );
};

export default ForgotPassword;