import React, {FormEvent, useState} from 'react';
import registerPicture from "../assets/img/register.jpg";
import ShadowWrapper from "../components/MiniComponents/ShadowWrapper";
import ShowPassword from "../components/MiniComponents/ShowPassword";
import {Link, useNavigate} from "react-router-dom";
import AuthWithGoogle from "../components/AuthWithGoogle";
import {toast} from "react-toastify";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth, database} from '../firebaseConfig';
import Loader from "../components/MiniComponents/Loader";
import {doc, setDoc, Timestamp} from 'firebase/firestore';
import {useAppDispatch} from "../hooks/customHooks";
import {setCurrentUser} from "../redux/slices/authSlice";


const Register = () => {

    const navigate = useNavigate()
    const [passwordIsShow, setPasswordIsShow] = useState(false)
    const [cpasswordIsShow, setCPasswordIsShow] = useState(false)
    const dispatch = useAppDispatch()


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
        loading: false
    })

    const {name, email, password, cPassword, loading} = formData

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (password !== cPassword) {
            toast.error(`Passwords ain't same`)
        }
        setFormData({...formData, loading: true})
        try {

            // create user (in Authentication of Firebase)
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(result.user)

            // add name to user (in Authentication of Firebase)
            if (auth?.currentUser) {
                await updateProfile(auth?.currentUser, {
                    displayName: name
                })
            }

            // create doc in database

            await setDoc(doc(database, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date())
            })


            dispatch(setCurrentUser({
                email,
                userName: name,
                userID: result.user.uid
            }))

            toast.success('You signed up')
            navigate('/')


        } catch (e: any) {
            toast.error(e.message)

        } finally {
            setFormData({...formData, loading: false})
        }
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <section className={'max-w-[1280px] mx-auto flex-auto flex items-center justify-center gap-[30px]'}>
            <ShadowWrapper>
                <div>
                    <h2 className={'text-center text-[44px] font-bold mb-4'}>Sign up</h2>
                    <form className={'flex flex-col'} onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder={'Name'} required value={name}
                               onChange={handleChange}
                               className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                   'border-gray-300 outline-none focus:border-blue-500 mb-[12px]'}/>
                        <input type="email" name="email" placeholder={'Email'} required value={email}
                               onChange={handleChange}
                               className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                   'border-gray-300 outline-none focus:border-blue-500 mb-[12px]'}/>
                        <div className={'relative'}>
                            <input type={passwordIsShow ? 'text' : 'password'} name="password" required
                                   placeholder={'Password'} value={password}
                                   onChange={handleChange}
                                   className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                       'border-gray-300 outline-none focus:border-blue-500 mb-[12px]'}/>
                            <ShowPassword passwordIsShow={passwordIsShow} setPasswordIsShow={setPasswordIsShow}/>
                        </div>
                        <div className={'relative'}>
                            <input type={cpasswordIsShow ? 'text' : 'password'} name="cPassword" required
                                   placeholder={'Confirm Password'} value={cPassword}
                                   onChange={handleChange}
                                   className={'text-[20px] w-[380px] p-3 rounded-[10px] bg-white border-2 ' +
                                       'border-gray-300 outline-none focus:border-blue-500 mb-[12px]'}/>
                            <ShowPassword passwordIsShow={cpasswordIsShow} setPasswordIsShow={setCPasswordIsShow}/>
                        </div>

                        <div className={'flex justify-between w-full text-[14px] mb-3'}>
                            <div>
                                <span className={'mr-[5px]'}>Do you have an account?</span>
                                <Link className={'text-red-600 cursor-pointer'} to={'/login'}>Login</Link>
                            </div>
                        </div>
                        <button className={'bg-green-500 p-[10px] rounded-[5px] w-full text-[26px] text-white ' +
                            'max-[960px]:p-[6px] hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg ' +
                            'active:shadow-lg transition duration-300 ease-in-out mb-3'}>
                            Sign up
                        </button>
                        <div className={'gap-[20px] w-full flex items-center before:border-b before:flex-1 ' +
                            'before:border-gray-400 after:border-b after:flex-1 after:border-gray-400 mb-3'}>
                            <p>OR</p>
                        </div>
                        <AuthWithGoogle/>

                    </form>
                </div>
            </ShadowWrapper>
            <div>
                <img src={registerPicture} alt="" width={450}/>
            </div>
        </section>
    );
};

export default Register;