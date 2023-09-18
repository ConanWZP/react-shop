import React from 'react';
import {useAppSelector} from "../../hooks/customHooks";
import useFetchCollection from "../../hooks/useFetchCollection";
import {setOrdersHistoryAdmin} from "../../redux/slices/orderSlice";
import Loader from "../MiniComponents/Loader";
import OrdersHistoryPage from "../../pages/Orders/OrdersHistoryPage";

const CheckOrders = () => {

    const {data, loading} = useFetchCollection('orders')
    const {ordersHistoryAdmin} = useAppSelector(state => state.order)

    if (loading) {
        return <Loader />
    }

    return (
        <OrdersHistoryPage data={data} loading={loading} setOrders={setOrdersHistoryAdmin} orders={ordersHistoryAdmin} />
    );
};

export default CheckOrders;