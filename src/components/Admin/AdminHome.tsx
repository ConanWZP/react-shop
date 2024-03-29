import React, {useEffect, useState} from 'react';
import {BsCart3} from 'react-icons/bs';
import {GrMoney} from 'react-icons/gr'
import {IoCartOutline} from 'react-icons/io5';
import AdminInfoBlock from "../MiniComponents/AdminInfoBlock";
import useFetchCollection from "../../hooks/useFetchCollection";
import Loader from "../MiniComponents/Loader";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import { calculateTotalOrdersPrice } from '../../redux/slices/orderSlice';
import AdminChart from "./orders/AdminChart";


const productIcon = <BsCart3 size={22} color={'#4066ad'}/>
const moneyIcon = <GrMoney size={22} color={'#5dad40'}/>
const orderIcon = <IoCartOutline size={22} color={'#ad7140'}/>


const AdminHome = () => {

    const dispatch = useAppDispatch()
    const [productsNumber, setProductsNumber] = useState(0)
    const [ordersNumber, setOrdersNumber] = useState(0)
    const {data, loading} = useFetchCollection('orders')

    const productsCollection = useFetchCollection('products')


    const {ordersTotalPrice} = useAppSelector(state => state.order)

    useEffect(() => {

        dispatch(calculateTotalOrdersPrice(data))
        setProductsNumber(productsCollection.data.length)
       // fetchLengthOrdersCollection()
        setOrdersNumber(data.length)
    }, [data, productsCollection.data.length, dispatch])

    if (loading) {
        return <Loader />
    }

    return (
        <div className={`w-full 
        flex flex-col justify-center items-center mx-auto`}>
            <h2 className={`text-[40px] font-bold text-left max-[500px]:text-[32px]`}>Admin home page</h2>
            <div className={`w-full mx-auto max-w-[612px] mb-6`}>
                <div className={`flex flex-wrap gap-3 max-[630px]:flex-nowrap max-[630px]:flex-col max-[630px]:items-center`}>
                    <AdminInfoBlock number={productsNumber} title={'Products'} icon={productIcon}
                                    extraStyles={'border-b-[3px] border-b-[#4066ad]'}/>
                    <AdminInfoBlock number={`${ordersTotalPrice}$`} title={'Income'} icon={moneyIcon}
                                    extraStyles={'border-b-[3px] border-b-[#5dad40]'}/>
                    <AdminInfoBlock number={ordersNumber} title={'Orders'} icon={orderIcon}
                                    extraStyles={'border-b-[3px] border-b-[#ad7140]'}/>

                </div>
            </div>
            <AdminChart orders={data} />

        </div>
    );
};

export default AdminHome;