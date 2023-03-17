import React, {FC} from 'react';
import {
    addProductToCart,
    cartItem,
    decreaseProductInCart,
    removeProductFromCart
} from "../redux/slices/cartSlice";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {IoCloseOutline} from 'react-icons/io5'
import {useAppDispatch} from "../hooks/customHooks";
import Notiflix from "notiflix";

interface CartItemProps {
    item: cartItem
}

const CartItem: FC<CartItemProps> = ({item}) => {

    const dispatch = useAppDispatch()

    const increaseCurrentItem = (item: cartItem) => {
        dispatch(addProductToCart(item))
    }

    const decreaseCurrentItem = (item: cartItem) => {

        if (item.count > 1) {
            dispatch(decreaseProductInCart(item))
        } else {
            removeCurrentItem(item)
        }

    }

    const removeCurrentItem = (item: cartItem) => {
        Notiflix.Confirm.show(
            'Remove the product',
            'Do you really want to remove the product?',
            'Remove',
            'Cancel',
            function okCb() {
                dispatch(removeProductFromCart(item))
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



    return (
        <div className={`flex w-full border-t border-slate-300 pt-7 mt-7`}>

            <div className={`w-[10%] flex items-center mr-4`}>
                <img src={item.imageURLs[0]} className={`w-[80px] h-[80px] object-contain`} alt=""/>
            </div>

            <div className={`w-[40%] flex justify-center flex-col`}>
                <h3 className={`text-[24px] font-bold`}>{item.name}</h3>
            </div>

            <div className={`flex items-center justify-between w-[13%]`}>
                <button onClick={() => decreaseCurrentItem(item)}
                        className={`border-2 border-green-500 rounded-full p-2 transition-all duration-300 easy-in-out 
                text-green-500 hover:bg-green-500 hover:text-white`}>
                    <AiOutlineMinus size={20}/>
                </button>
                <b className={`text-[26px]`}>{item.count}</b>
                <button onClick={() => increaseCurrentItem(item)}
                        className={`border-2 border-green-500 rounded-full p-2 transition-all duration-300 easy-in-out 
                text-green-500 hover:bg-green-500 hover:text-white`}>
                    <AiOutlinePlus size={20}/>
                </button>
            </div>

            <div className={`flex flex-col items-center justify-center w-[33%] gap-2`}>
                <b className={`text-[22px]`}>For 1: {item.price}$</b>
                <b className={`text-[22px]`}>Total: {item.price*item.count}$</b>
            </div>
            <div className={`flex items-center justify-end w-[4%]`}>
                <button onClick={() => removeCurrentItem(item)}
                        className={`border-2 border-slate-500 rounded-full p-2 transition-all duration-300 easy-in-out 
                text-slate-500 hover:bg-black hover:text-white hover:border-black`}>
                    <IoCloseOutline size={20}/>
                </button>
            </div>

        </div>
    );
};

export default CartItem;