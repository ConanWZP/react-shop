import React from 'react';
import {useAppSelector} from "../../hooks/customHooks";

const CheckoutInfo = () => {

    const {items, itemsNumber, itemsValue} = useAppSelector(state => state.cart)

    return (
        <div className={`shadow-xl p-2 bg-gray-100 rounded text-[18px] max-h-[600px] overflow-auto max-[920px]:max-h-full`}>
            <h2>Checkout Info</h2>

            {
                items.length > 0 ?
                    <>

                        <h3>Product quantity: {itemsNumber}</h3>
                        <div className={`flex justify-between items-center mb-6`}>
                            <b>Total Price</b>
                            <span>{itemsValue}$</span>
                        </div>

                        {items.map((item) =>
                            <div key={item.id} className={`border-slate-400 p-2 border-2 rounded-[10px] mb-2`}>
                                <h2 className={`font-semi-bold`}>Product: {item.name}</h2>
                                <div className={`flex justify-between`}>
                                    <div>Price for 1: {item.price}$</div>
                                    <div>Total: {item.price * item.count}$</div>
                                </div>
                                <div className={`opacity-60`}>Quantity: {item.count}</div>
                            </div>
                        )}
                    </>

                    :
                    <h2 className={`font-bold text-[22px] text-center`}>The cart is empty</h2>
            }


        </div>
    );
};

export default CheckoutInfo;