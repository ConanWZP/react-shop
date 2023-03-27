import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import useFetchDoc from "../../hooks/useFetchDoc";
import OrderDetailItem from "../../components/OrderDetailItem";
import {AiOutlineLeft} from "react-icons/ai";

const OrderDetailsPage = () => {

    const params = useParams()
    const location = useLocation()
    const [orderData, setOrderData] = useState<any>()

    const {documentData, loading} = useFetchDoc('orders', params?.id)

    useEffect(() => {
        setOrderData(documentData)
    }, [documentData])

    const existedStatus: string[] = [
        'The order was created',
        'Proceeded',
        'On the way',
        'Delivered'
    ]

    const [status, setStatus] = useState<any>()

    const changeStatus = (e: any) => {
        setStatus(e.target.value)
        console.log(status)
    }

    return (
        <section className={`w-full flex-auto`}>
            <div className={`max-w-[1280px] mx-auto flex flex-col pb-6 
            ${location.pathname === `/admin/order-details/${params?.id}` ? '' : 'pt-24'}`}>
                {
                    orderData ?
                        <>
                            <div className={'mb-10'}>
                                <h2 className={`text-[32px] font-bold`}>Order details</h2>

                                <Link to={location.pathname === `/admin/order-details/${params?.id}` ?
                                    '/admin/check-orders'
                                    :
                                    '/orders-history'}
                                      className={`mb-6 py-1.5 px-5 border border-slate-400 transition-all duration-300 ease-in-out
                                rounded-r-full rounded-l-full inline-flex items-center text-slate-500 
                                hover:bg-black hover:text-white hover:border-black`}>
                                    <AiOutlineLeft size={20}/>
                                    <span>Back to orders history</span>
                                </Link>


                                <div className={`text-[18px]`}>
                                    <div>
                                        <span className={`font-medium`}>Order ID: </span>
                                        <span>{orderData.id}</span>
                                    </div>
                                    <div>
                                        <span className={`font-medium`}>Order total price: </span>
                                        <span>{orderData.orderTotalAmount}$</span>
                                    </div>
                                    <div>
                                        <span className={`font-medium`}>Order status: </span>
                                        <span>{orderData.orderStatus}</span>
                                    </div>
                                    {
                                        location.pathname === `/admin/order-details/${params?.id}` ?
                                            <div>
                                                <span className={`font-medium`}>Shipping address: </span>
                                                <span>{orderData.shippingAddress}</span>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>

                            <div className={`text-[20px] font-[600]`}>
                                <div className={`flex w-full border-t border-slate-300 py-3.5 justify-between`}>

                                    <div className={`w-[35%] flex justify-center flex-col items-center`}>
                                        <div>Product</div>
                                    </div>

                                    <div className={`flex items-center justify-center w-[25%]`}>
                                        Quantity
                                    </div>

                                    <div className={`flex flex-col items-center justify-center w-[20%] gap-2`}>
                                        Price
                                    </div>
                                    <div className={`flex items-center justify-center w-[20%] `}>
                                        Action
                                    </div>

                                </div>
                            </div>
                            <div>
                                {
                                    orderData.orderItems.map((orderItem: any, index: number) =>
                                        <OrderDetailItem key={orderItem.id} orderItem={orderItem} index={index}/>
                                    )
                                }
                            </div>
                            {
                                location.pathname === `/admin/order-details/${params?.id}` ?
                                    <div className={`pt-4`}>
                                        <select required name={'category'} value={status} onChange={changeStatus}
                                                className={`w-[50vw] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none appearance-none cursor-pointer max-[970px]:w-full`}>
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
                                    </div>
                                    :
                                    null
                            }
                        </>
                        :
                        <div>Loading</div>
                }


            </div>
        </section>
    );
};

export default OrderDetailsPage;