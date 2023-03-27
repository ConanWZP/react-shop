import React, {FC, useEffect} from 'react';
import useFetchCollection from "../../hooks/useFetchCollection";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {setOrdersHistory} from '../../redux/slices/orderSlice';
import {cartItem} from "../../redux/slices/cartSlice";
import CartItem from "../../components/CartItem";
import OrderItem from '../../components/OrderItem';
import {Link, useLocation} from "react-router-dom";
import Loader from "../../components/MiniComponents/Loader";

interface OrdersHistoryPageProps {
    data: any[],
    loading: boolean,
    setOrders: any
    orders: any[]
}

const OrdersHistoryPage: FC<OrdersHistoryPageProps> = ({data, loading, setOrders, orders}) => {

    const dispatch = useAppDispatch()
    const {userID} = useAppSelector(state => state.auth)

    const location = useLocation()


    // const {data, loading} = useFetchCollection('orders', 'userID', '==', userID)

    useEffect(() => {
        //  dispatch(setOrdersHistory(data))
        dispatch(setOrders(data))
    }, [dispatch, data])


    //const {ordersHistory} = useAppSelector(state => state.order)

    if (!userID) {
        return <Link to={'/login'}>Sign into your account</Link>
    }

    if (loading) {
        return <Loader/>
    }


    return (
        <section className={`w-full flex-auto`}>
            <div className={`max-w-[1280px] mx-auto ${location.pathname === `/admin/check-orders` ? '' : 'pt-16'}`}>
                <h2 className={`text-[40px] font-bold mb-4 text-center`}>
                    {
                        location.pathname === `/admin/check-orders` ?
                            'All orders'
                            :
                            'Your orders'
                    }
                </h2>
                {
                    orders.length > 0 ?
                        <>

                            <div className={`flex w-full font-[600] text-[20px] `}>

                                <div className={`w-[10%] flex items-center justify-center`}>
                                    Number
                                </div>

                                <div className={`w-[15%] flex justify-center flex-col items-center`}>
                                    Date

                                </div>

                                <div className={`flex items-center justify-center w-[35%]`}>
                                    Order ID
                                </div>

                                <div className={`flex flex-col items-center justify-center w-[20%] gap-2`}>
                                    Price
                                </div>
                                <div className={`flex items-center justify-center w-[20%]`}>
                                    Order status
                                </div>

                            </div>


                            <div>
                                {
                                    orders.map((order, index) =>
                                        <OrderItem key={order.id} order={order} index={index}/>
                                    )
                                }
                            </div>
                        </>

                        :
                        <div>empty</div>
                }
            </div>
        </section>
    );
};

export default OrdersHistoryPage;