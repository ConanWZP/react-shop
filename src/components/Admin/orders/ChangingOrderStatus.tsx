import React, {FC, useState} from 'react';
import {addDoc, collection, doc, setDoc, Timestamp} from "firebase/firestore";
import {database} from "../../../firebaseConfig";
import {toast} from "react-toastify";
import {clearCart} from "../../../redux/slices/cartSlice";
import {useNavigate} from "react-router-dom";

interface ChangingOrderStatusProps {
    loading: boolean,
    id?: string,
    order: any
}

const ChangingOrderStatus: FC<ChangingOrderStatusProps> = ({loading, id, order}) => {

    const existedStatus: string[] = [
        'The order was created...',
        'In processing',
        'On the way',
        'Delivered'
    ]

    const navigate = useNavigate()
    const [status, setStatus] = useState<any>('')
    const [isLoading, setIsLoading] = useState(false)

    const changeStatus = (e: any) => {
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    const saveNewOrderStatus = async (e: any, id: any) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(order)
        const orderData = {
            createdOrderData: order.createdOrderData,
            createdOrderTime: order.createdOrderTime,
            userID: order.userID,
            userEmail: order.userEmail,
            orderItems: order.orderItems,
            orderTotalAmount: order.orderTotalAmount,
            orderStatus: status,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            editedAt: Timestamp.fromDate(new Date())

        }

        try {
            await setDoc(doc(database, 'orders', id), orderData)
            toast.success('Order status was changed')
            navigate('/admin/check-orders')
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`p-3 rounded border-2 border-blue-400 shadow-lg max-w-[50%] mt-6 max-[970px]:max-w-full`}>
            <h2 className={`text-[26px] font-[600] mb-4`}>Change order status</h2>
            <form onSubmit={(e) => saveNewOrderStatus(e, id)} className={`flex flex-col `}>
                <select required name={'category'} value={status} onChange={changeStatus}
                        className={`w-full rounded-[10px] p-3 border-2 border-gray-300 text-[22px] mx-auto
                           focus:border-blue-500 outline-none mb-3 cursor-pointer max-[500px]:text-[16px]`}>
                    {loading ?
                        <option value={''} disabled>Loading...</option>
                        :
                        <>
                            <option value={''} disabled>
                                -- empty --
                            </option>
                            {existedStatus.map((status: any, index: number) =>
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            )}
                        </>
                    }
                </select>
                <div className={`text-center`}>
                    <button className={`bg-blue-500 text-white px-7 py-2 rounded text-[22px] hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium`}>Save new status</button>
                </div>

            </form>
        </div>
    );
};

export default ChangingOrderStatus;