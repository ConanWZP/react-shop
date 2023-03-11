import React, {FC, useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {BiCart, BiMenu} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth, database} from "../firebaseConfig";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../hooks/customHooks";
import {setCurrentUser} from "../redux/slices/authSlice";
import {doc, getDoc} from "firebase/firestore";



interface CartProps {
    border: boolean,
    closeMenu?: () => void
    linkIsActive: any
}

const CartComponent: FC<CartProps> = ({border, closeMenu, linkIsActive}) => {
    return (
        <span onClick={closeMenu}>
                            <NavLink to={'/cart'}
                                     className={(state) => linkIsActive(state) + ' ' +
                                         `mr-2 flex items-center hover:text-green-400 transition-all duration-300 ease-in-out 
                                 hover:text-[1.3rem] ${border ? 'max-[970px]:border-b' : ''} border-slate-400 max-[970px]:mr-0`}>
                                Cart
                                <div className={'relative'}>
                                    <BiCart size={18}/>
                                <p className={`absolute right-[2px] top-[-19px] rotate-[20deg] animate-spin text-green-400`}>4</p>
                                </div>

                            </NavLink>
                        </span>
    )
}

const Logo = () => {
    return (
        <div>
            <Link to={'/'}>
                <h2 className={'cursor-pointer text-[26px] font-[700] w-1/4'}>
                    Sho<span className={'text-green-400'}>pp</span>er
                </h2>
            </Link>
        </div>
    )
}


interface NavLinkState {
    isActive: boolean,
    isPending: boolean
}

const Header = () => {


    const navigate = useNavigate()
    const [menuIsShow, setMenuIsShow] = useState(false)
    // const [userName, setUserName] = useState<any>(null)
    const {userName, email} = useAppSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const changeMenuStatus = () => {
        setMenuIsShow(!menuIsShow)
    }

    const closeMenu = () => {
        setMenuIsShow(false)
    }

    const linkIsActive = (state: NavLinkState) => (state.isActive ? 'border-b-[3px] border-green-500' : '');

    const logout = async () => {
        try {
            console.log(auth)
            await signOut(auth)
            dispatch(setCurrentUser({
                email: null,
                userName: null,
                userID: null
            }))
            toast.success('You signed out')
            navigate('/')
        } catch (e: any) {
            toast.error(e.message)
        }
    }


    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const getData = async () => {
                    const docRef = doc(database, 'users', user.uid)
                    const docData = await getDoc(docRef)
                    if (docData.exists()) {
                        console.log(docData.data())
                        dispatch(setCurrentUser({
                            email: docData.data().email,
                            userName: docData.data().name,
                            userID: docData.data().uid
                        }))
                        setLoading(false)
                    }

                }
                getData()

            } else {
                console.log('no user')
                console.log(user)
                setLoading(false)
                //setUserName(null)
            }


            //setLoading(false)
        })
    }, [dispatch])

    return (
        <header className={'w-full text-white bg-[#406bad]'}>
            <div className={'flex items-center justify-between h-[64px] w-full p-4 mx-auto text-[18px] '}>
                <Logo/>
                <nav className={`w-3/4 flex justify-between max-[970px]:block max-[970px]:absolute max-[970px]:top-0 max-[970px]:left-0 max-[970px]:w-1/2 max-[970px]:h-[100vh] 
                max-[970px]:bg-[#406bad] max-[970px]:z-50 max-[970px]:transform max-[970px]:transition max-[970px]:duration-300 max-[970px]:px-[15px] pt-[6px]
                ${menuIsShow ? 'max-[970px]:transform max-[970px]:translate-x-0' : 'max-[970px]:transform max-[970px]:translate-x-[-200%]'}`}>

                    <div className={`max-[970px]:absolute max-[970px]:top-0 max-[970px]:right-0 max-[970px]:w-full max-[970px]:h-[100vh] max-[970px]:bg-[#00000080] max-[970px]:transform max-[970px]:translate-x-0
                    max-[970px]:transition max-[970px]:duration-300 ${menuIsShow ? `max-[970px]:translate-x-[100%] ` : ''}`}
                         onClick={closeMenu}>
                    </div>

                    <div className={'flex justify-between gap-[12px] max-[970px]:flex-col max-[970px]:mb-[8px]'}
                         onClick={closeMenu}>
                        <div className={'min-[769px]:hidden flex items-center justify-between'}>
                            <Logo/>
                            <AiOutlineClose size={28} className={'cursor-pointer'} onClick={closeMenu}/>
                        </div>
                        {
                            email === 'yaroslav2281337@gmail.com' ?
                                <Link to={'/admin/home'} className={'text-center'}>
                                    <button className={`bg-blue-500 px-2 py-[2px] rounded transition-all duration-300 
                            ease-in-out`}>Admin</button>
                                </Link>
                                :
                                null
                        }


                        <NavLink to={'/'}
                                 className={(state) => linkIsActive(state) + ' ' +
                                     `hover:text-green-400 transition-all duration-300 ease-in-out max-[970px]:border-b border-slate-400 hover:text-[1.3rem]`}>Home</NavLink>


                        <NavLink className={(state) => linkIsActive(state) + ' ' +
                            'hover:text-green-400 transition-all duration-300 ease-in-out max-[970px]:border-b border-slate-400 hover:text-[1.3rem]'}
                                 to={'/contact'}>Contact us</NavLink>

                    </div>

                    <div className={'flex max-[970px]:flex-col max-[970px]:gap-[8px]'}>
                        {
                            loading ?
                                <div>Loading...</div>
                                :
                                <span onClick={closeMenu}
                                      className={'mr-2 max-[970px]:flex max-[970px]:flex-col max-[970px]:gap-[8px] max-[970px]:mr-0'}>
                            {userName ?
                                <NavLink to={'/profile'}
                                         className={(state) => linkIsActive(state) + ' ' +
                                             'mr-3 hover:text-green-400 transition-all duration-300 ease-in-out ' +
                                             'max-[970px]:border-b border-slate-400 max-[970px]:mr-0 hover:text-[1.3rem]'}>Hi, {userName}</NavLink>
                                :
                                <>
                                    <NavLink to={'/login'}
                                             className={(state) => linkIsActive(state) + ' ' +
                                                 'mr-3 hover:text-green-400 transition-all duration-300 ease-in-out ' +
                                                 'max-[970px]:border-b border-slate-400 max-[970px]:mr-0 hover:text-[1.3rem]'}>Login</NavLink>
                                    <NavLink to={'/register'}
                                             className={(state) => linkIsActive(state) + ' ' +
                                                 'mr-3 hover:text-green-400 transition-all duration-300 ease-in-out ' +
                                                 'max-[970px]:border-b border-slate-400 max-[970px]:mr-0 hover:text-[1.3rem]'}>Sign up</NavLink>
                                </>

                            }

                                    <NavLink to={'/order'}
                                             className={(state) => linkIsActive(state) + ' ' +
                                                 'mr-3 hover:text-green-400 transition-all duration-300 ease-in-out ' +
                                                 'max-[970px]:border-b border-slate-400 max-[970px]:mr-0 hover:text-[1.3rem]'}>My orders</NavLink>
                                    {userName ?
                                        <span onClick={logout}
                                              className={'cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out ' +
                                                  'max-[970px]:border-b border-slate-400 max-[970px]:mr-0 hover:text-[1.3rem]'}>Logout</span>
                                        : null

                                    }


                        </span>
                        }

                        <CartComponent border={true} closeMenu={closeMenu} linkIsActive={linkIsActive}/>
                    </div>


                </nav>

                <div className={'hidden max-[970px]:flex max-[970px]:items-center gap-2'}>
                    <CartComponent border={false} linkIsActive={linkIsActive}/>
                    <BiMenu size={26} className={'cursor-pointer'} onClick={changeMenuStatus}/>
                </div>


            </div>

        </header>
    );
};

export default Header;