import React, {FC} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";


interface OrderItemProps {
    order: any,
    index: number
}

const OrderItem:FC<OrderItemProps> = ({order, index}) => {

    const location = useLocation()
    const navigate = useNavigate()

    const redirectToOrder = (id: string) => {

        if (location.pathname === '/admin/check-orders') {
            navigate(`/admin/order-details/${id}`)
        } else {
            navigate(`/order-details/${id}`)
        }


    }

    return (
        <div className={`flex w-full border-t border-slate-300 py-3.5 cursor-pointer ${index%2 !== 0 ? 'bg-gray-100' : ''}`}
             onClick={() => redirectToOrder(order.id)}>

            <div className={`w-[10%] flex items-center justify-center max-[900px]:hidden`}>
                {index + 1}
            </div>

            <div className={`w-[15%] flex justify-center flex-col items-center max-[900px]:w-[17%] max-[480px]:w-[19%]`}>
                <div>{order.createdOrderData}</div>
                <div>{order.createdOrderTime}</div>

            </div>

            <div className={`flex items-center justify-center w-[35%] max-[900px]:w-[41%] max-[480px]:w-[48%]`}>
                {order.id}
            </div>

            <div className={`flex flex-col items-center justify-center w-[20%] max-[480px]:w-[10%]`}>
                {order.orderTotalAmount}$
            </div>
            <div className={`flex items-center justify-center w-[20%] max-[900px]:w-[22%]  text-center ${order.orderStatus !== 'Delivered' ? 'text-slate-600' : 'text-green-500'}`}>
                {order.orderStatus}
            </div>

        </div>
    );
};

export default OrderItem;