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
        <div className={`flex w-full border-t border-slate-300 pt-7 mt-7 `}>
            <div className={`w-[50%] flex items-center max-[840px]:w-[53%] max-[620px]:w-[62%] 
            max-[520px]:flex-col-reverse text-center max-[520px]:w-[41%]`}>
            {/*<div className={`w-[10%] flex items-center`}>
                <img src={item.imageURLs[0]} className={`w-[80px] h-[80px] object-contain`} alt=""/>
            </div>

            <div className={`w-[40%] flex justify-center flex-col max-[840px]:w-[43%] max-[620px]:w-[52%] `}>
                <h3 className={`text-[24px] font-bold max-[840px]:text-[18px] max-[620px]:text-[16px]`}>{item.name}</h3>
            </div>*/}
                <div className={`w-[20%] flex items-center max-[840px]:w-[19%] max-[620px]:w-[16%] max-[520px]:w-full justify-center`}>
                    <img src={item.imageURLs[0]} className={`w-[80px] h-[80px] object-contain`} alt=""/>
                </div>

                <div className={`w-[80%] flex justify-center flex-col max-[840px]:w-[81%] max-[620px]:w-[84%] max-[520px]:w-full`}>
                    <h3 className={`text-[24px] font-bold max-[840px]:text-[18px] max-[620px]:text-[16px]`}>{item.name}</h3>
                </div>
            </div>
            <div className={`flex items-center justify-between w-[13%] max-[620px]:w-[11%] max-[520px]:w-[18%]`}>
                <button onClick={() => decreaseCurrentItem(item)}
                        className={`border-2 border-green-500 rounded-full p-2 transition-all duration-300 easy-in-out 
                text-green-500 hover:bg-green-500 hover:text-white max-[840px]:p-1 max-[620px]:p-0.5`}>
                    <AiOutlineMinus className={`text-[20px] max-[840px]:text-[14px] max-[620px]:text-[12px]`}/>
                </button>
                <b className={`text-[26px] max-[840px]:text-[20px] max-[620px]:text-[16px]`}>{item.count}</b>
                <button onClick={() => increaseCurrentItem(item)}
                        className={`border-2 border-green-500 rounded-full p-2 transition-all duration-300 easy-in-out 
                text-green-500 hover:bg-green-500 hover:text-white max-[840px]:p-1 max-[620px]:p-0.5`}>
                    <AiOutlinePlus className={`text-[20px] max-[840px]:text-[14px] max-[620px]:text-[12px]`}/>
                </button>
            </div>

            <div className={`flex flex-col items-center justify-center w-[30%] gap-2 text-[22px] 
            max-[840px]:text-[18px] max-[620px]:w-[20%] max-[620px]:text-[16px] max-[620px]:w-[22%] max-[520px]:w-[35%]`}>
                <b className={``}>For 1: {item.price}$</b>
                <b className={``}>Total: {item.price*item.count}$</b>
            </div>
            <div className={`flex items-center justify-end w-[7%] max-[840px]:w-[4%] max-[620px]:w-[5%] max-[520px]:w-[6%]`}>
                <button onClick={() => removeCurrentItem(item)}
                        className={`border-2 border-slate-500 rounded-full p-2 transition-all duration-300 easy-in-out 
                text-slate-500 hover:bg-black hover:text-white hover:border-black max-[840px]:p-1 max-[620px]:p-0.5`}>
                    <IoCloseOutline className={`text-[20px] max-[840px]:text-[14px] max-[620px]:text-[12px]`}/>
                </button>
            </div>

        </div>
    );
};

export default CartItem;