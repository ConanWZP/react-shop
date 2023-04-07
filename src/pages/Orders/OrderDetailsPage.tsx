import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import useFetchDoc from "../../hooks/useFetchDoc";
import OrderDetailItem from "../../components/OrderDetailItem";
import {AiOutlineLeft} from "react-icons/ai";
import ChangingOrderStatus from "../../components/Admin/orders/ChangingOrderStatus";

const OrderDetailsPage = () => {

    const params = useParams()
    const location = useLocation()
    const [orderData, setOrderData] = useState<any>()

    const {documentData, loading} = useFetchDoc('orders', params?.id)

    useEffect(() => {
        setOrderData(documentData)
    }, [documentData])



    return (
        <section className={`w-full flex-auto`}>
            <div className={`max-w-[1280px] mx-auto flex flex-col pb-6 
            ${location.pathname === `/admin/order-details/${params?.id}` ? '' : 'pt-20'}`}>
                {
                    orderData ?
                        <>
                            <div className={'mb-10 px-1'}>
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


                                <div className={`text-[18px] max-[600px]:text-[16px]`}>
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

                            <div className={`text-[20px] font-[600] max-[600px]:text-[16px]`}>
                                <div className={`flex w-full border-t border-slate-300 py-3.5 justify-between`}>

                                    <div className={`w-[45%] flex justify-center flex-col items-center max-[420px]:w-[40%]`}>
                                        <div>Product</div>
                                    </div>

                                    <div className={`flex items-center justify-center w-[15%]`}>
                                        Quantity
                                    </div>

                                    <div className={`flex flex-col items-center justify-center w-[20%] gap-2 max-[420px]:w-[25%]`}>
                                        Price
                                    </div>
                                    <div className={`flex items-center justify-center w-[20%]`}>
                                        Action
                                    </div>

                                </div>
                            </div>
                            <div className={`max-[600px]:text-[14px]`}>
                                {
                                    orderData.orderItems.map((orderItem: any, index: number) =>
                                        <OrderDetailItem key={orderItem.id} orderItem={orderItem} index={index}/>
                                    )
                                }
                            </div>
                            {
                                location.pathname === `/admin/order-details/${params?.id}` ?
                                    <ChangingOrderStatus loading={loading} id={params?.id} order={orderData}/>
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