import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";


interface OrderItemProps {
    order: any,
    index: number
}

const OrderItem:FC<OrderItemProps> = ({order, index}) => {

    const navigate = useNavigate()

    const redirectToOrder = (id: string) => {
        navigate(`/order-details/${id}`)
    }

    return (
        <div className={`flex w-full border-t border-slate-300 py-3.5 cursor-pointer ${index%2 !== 0 ? 'bg-gray-100' : ''}`}
             onClick={() => redirectToOrder(order.id)}>

            <div className={`w-[10%] flex items-center justify-center`}>
                {index + 1}
            </div>

            <div className={`w-[15%] flex justify-center flex-col items-center`}>
                <div>{order.createdOrderData}</div>
                <div>{order.createdOrderTime}</div>

            </div>

            <div className={`flex items-center justify-center w-[35%]`}>
                {order.id}
            </div>

            <div className={`flex flex-col items-center justify-center w-[20%] gap-2`}>
                {order.orderTotalAmount}$
            </div>
            <div className={`flex items-center justify-center w-[20%] ${order.orderStatus !== 'Delivered' ? 'text-slate-600' : 'text-green-500'}`}>
                {order.orderStatus}
            </div>

        </div>
    );
};

export default OrderItem;