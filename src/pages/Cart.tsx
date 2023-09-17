import React, {useEffect} from 'react';
import {AiOutlineLeft} from 'react-icons/ai';
import {RiDeleteBin5Line} from 'react-icons/ri';
import CartItem from '../components/CartItem';
import {useAppDispatch, useAppSelector} from "../hooks/customHooks";
import {Link, useNavigate} from "react-router-dom";
import {
    calculateTotalCountOfProducts,
    calculateTotalPrice,
    cartItem,
    clearCart,
    saveLastURL
} from "../redux/slices/cartSlice";
import {BsCart2} from 'react-icons/bs';
import Notiflix from "notiflix";

const Cart = () => {

    const dispatch = useAppDispatch()
    const {items, itemsNumber, itemsValue} = useAppSelector(state => state.cart)

    const clearAllCart = () => {
        Notiflix.Confirm.show(
            'Clear the cart',
            'Do you really want to clear cart?',
            'Clear',
            'Cancel',
            function okCb() {
                dispatch(clearCart())
            },
            function cancelCb() {

            },
            {
                width: '320px',
                borderRadius: '8px',
                titleColor: 'rgb(59,130,246)',
                okButtonBackground: 'rgb(59,130,246)'
                // etc...
            },
        );
    }

    useEffect(() => {
        dispatch(calculateTotalPrice())
        dispatch(calculateTotalCountOfProducts())
    }, [items, dispatch])

    const url = window.location.href
    const navigate = useNavigate()
    const {isAuth} = useAppSelector(state => state.auth)

    const checkout = () => {
        if (isAuth) {
            navigate('/checkout-details')
        } else {
            dispatch(saveLastURL(url))
            console.log(url)
            navigate('/login')
        }
    }

    return (
        <div className={'flex-auto max-w-[1080px] mx-auto w-full py-32 px-2 max-[620px]:px-0.5 max-[520px]:px-0 max-[900px]:py-20'}>
            {
                items.length > 0 ?
                    <div>
                        <div className={`flex justify-between items-center max-[520px]:px-0.5`}>
                            <div className={`flex items-center gap-3 max-[520px]:gap-2`}>
                                <BsCart2 className={`text-[40px] max-[520px]:text-[32px]`}/>
                                <div className={`text-[32px] font-medium max-[520px]:text-[24px]`}>Cart</div>
                            </div>
                            <div onClick={() => clearAllCart()}
                                 className={`flex items-center gap-3 max-[520px]:gap-2 text-slate-500 hover:cursor-pointer 
                            transition-all duration-300 ease-in-out hover:text-black`}>
                                <RiDeleteBin5Line className={`text-[40px] max-[520px]:text-[32px]`}/>
                                <div className={`text-[32px] font-medium max-[520px]:text-[24px]`}>Clear cart</div>
                            </div>
                        </div>

                        <div>
                            {
                                items.map((item: cartItem) =>
                                    <CartItem key={item.id} item={item}/>
                                )
                            }
                        </div>

                        <div className={`mt-12 text-[22px] max-[520px]:text-[18px] max-[520px]:px-0.5`}>
                            <div className={`flex justify-between`}>
                                <span>
                                    Total products:
                                    <b> {itemsNumber}</b>
                                </span>
                                <span>
                                    Total price:
                                    <b> {itemsValue}$</b>
                                </span>
                            </div>
                            <div className={`flex justify-between mt-8`}>
                                <Link to={'/'} className={`py-4 px-8 border border-slate-400 transition-all duration-300 ease-in-out
                                rounded-r-full rounded-l-full flex items-center text-slate-500 
                                hover:bg-black hover:text-white hover:border-black max-[520px]:px-2 max-[520px]:py-0.5 max-[520px]:text-[20px]`}>
                                    <AiOutlineLeft className={`text-[30px] max-[520px]:text-[24px]`}/>
                                    <span>Back to home</span>
                                </Link>
                                <div>
                                    <button onClick={() => checkout()}
                                        className={`py-4 px-8 bg-green-500 transition-all duration-300 ease-in-out
                                rounded-r-full rounded-l-full flex items-center text-white
                                hover:bg-green-600 max-[520px]:px-2 max-[520px]:py-0.5 max-[520px]:text-[20px]`}>
                                        <span>Buy now</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <div className={`text-center font-bold mt-8 text-[40px] max-[520px]:px-0.5`}>The cart is empty </div>
            }
        </div>
    );
};

export default Cart;