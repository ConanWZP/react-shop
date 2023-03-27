import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import useFetchCollection from "../../hooks/useFetchCollection";
import {setOrdersHistoryAdmin} from "../../redux/slices/orderSlice";
import {Link} from "react-router-dom";
import Loader from "../MiniComponents/Loader";
import OrderItem from "../OrderItem";
import OrdersHistoryPage from "../../pages/Orders/OrdersHistoryPage";

const CheckOrders = () => {
    const dispatch = useAppDispatch()
  //  const {userID} = useAppSelector(state => state.auth)



    const {data, loading} = useFetchCollection('orders')

   /* useEffect(() => {
        dispatch(setOrdersHistoryAdmin(data))
    }, [dispatch, data])*/



    const {ordersHistoryAdmin} = useAppSelector(state => state.order)


    if (loading) {
        return <Loader />
    }


    return (
        <OrdersHistoryPage data={data} loading={loading} setOrders={setOrdersHistoryAdmin} orders={ordersHistoryAdmin} />
    );
};

export default CheckOrders;