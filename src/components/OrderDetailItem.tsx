import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

interface OrderDetailItemProps {
    orderItem: any,
    index: number
}

const OrderDetailItem:FC<OrderDetailItemProps> = ({orderItem, index}) => {

    const navigate = useNavigate()

    return (
        <div className={`flex w-full border-t border-slate-300 py-3.5 justify-between ${index%2 !== 0 ? 'bg-gray-100' : ''}`}>


            <div className={`w-[35%] flex justify-center flex-col items-center`}>
                <div>{orderItem.name}</div>
                <img src={orderItem.imageURLs[0]} className={`w-[120px] h-[120px] object-contain `}/>

            </div>

            <div className={`flex items-center justify-center w-[25%]`}>
                {orderItem.count}
            </div>

            <div className={`flex flex-col items-center justify-center w-[20%] gap-2`}>
                <span>For 1: {orderItem.price}$</span>
                <span>Total: {orderItem.price*orderItem.count}$</span>
            </div>
            <div className={`flex items-center justify-center w-[20%] `}>
                <button onClick={() => navigate(`/creating-review/${orderItem.id}`)}
                    className={`cursor-pointer bg-green-500 px-3 py-0.5 text-white font-medium rounded 
                hover:bg-green-600 transition-bg duration-300 ease-in-out`}>Make a review</button>
            </div>

        </div>
    );
};

export default OrderDetailItem;