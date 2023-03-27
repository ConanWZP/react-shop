import React from 'react';
import OrdersHistoryPage from "./OrdersHistoryPage";
import useFetchCollection from "../../hooks/useFetchCollection";
import {useAppSelector} from "../../hooks/customHooks";
import { setOrdersHistory } from '../../redux/slices/orderSlice';

const OrdersHistoryPageContainer = () => {

    const {userID} = useAppSelector(state => state.auth)
    const {data, loading} = useFetchCollection('orders', 'userID', '==', userID)
    const {ordersHistory} = useAppSelector(state => state.order)

    return (
        <OrdersHistoryPage data={data} loading={loading} setOrders={setOrdersHistory} orders={ordersHistory} />
    );
};

export default OrdersHistoryPageContainer;