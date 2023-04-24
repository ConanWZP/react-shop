import React, {useEffect, useState} from 'react';
import AdminNavbar from "../components/Admin/AdminNavbar";
import {Route, Routes, useLocation} from "react-router-dom";
import AdminHome from "../components/Admin/AdminHome";
import ListGoods from "../components/Admin/ListGoods";
import AddGood from "../components/Admin/AddGood";
import CheckOrders from "../components/Admin/CheckOrders";
import CreateCategory from "../components/Admin/CreateCategory";
import {FaCogs} from "react-icons/fa";
import useFetchCollection from "../hooks/useFetchCollection";
import {useAppDispatch} from "../hooks/customHooks";
import AdminOrderDetails from "../components/Admin/orders/AdminOrderDetails";
import styles from "../components/Products/productsList.module.scss";
import {AiFillFilter, AiOutlineSortAscending} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";

const AdminPage = () => {

    const [hideAdminNavbar, setHideAdminNavbar] = useState(true)

    /*const dispatch = useAppDispatch()
    const {data, loading} = useFetchCollection('products')

    useEffect(() => {

    }, [data])*/

    if (!hideAdminNavbar) {
        document.body.classList.add(`${styles.locked}`)
    } else {
        document.body.classList.remove(`${styles.locked}`)
    }

    const location = useLocation()
    useEffect(() => {
        setHideAdminNavbar(true)

        return () => {
            document.body.classList.remove(`${styles.locked}`)
        }


    }, [location.pathname])

    return (
        <div className={'flex-auto min-[600px]:flex relative pt-16  '}>
            <div className={hideAdminNavbar ?
                `w-1/4 transition-all duration-300 ease-in-out max-[970px]:w-1/3 max-[970px]:bg-gray-100 overflow-auto
                        max-[970px]:absolute max-[970px]:left-[-200%] max-[768px]:h-[calc(100%_-_64px)] max-[970px]:z-10 pl-2 max-[600px]:w-full `
                :
                `w-1/4 transition-all duration-300 ease-in-out max-[970px]:w-1/3 max-[970px]:bg-gray-100 overflow-auto
                        max-[970px]:fixed top-0 pt-16 max-[970px]:h-[calc(100%_-_64px)] max-[970px]:z-10 left-0 pl-2 
                        max-[600px]:w-full max-[600px]:pl-1 max-[970px]:pb-4`}>
                <AdminNavbar />
            </div>
            {/*<div onClick={() => setHideAdminNavbar(!hideAdminNavbar)}
                 className={`hidden justify-center items-center absolute right-1 top-16 
                        cursor-pointer max-[970px]:flex`}>
                <FaCogs size={`20`} className={`text-green-500`}/>
                <span>{hideAdminNavbar ? `Show Admin Navbar` : `Hide Admin Navbar`}</span>
            </div>*/}
            <div className={`hidden max-[970px]:flex h-16 bg-white w-full fixed bottom-0 left-0 z-10 ${styles.shadow}`}>

                <div className={`w-full h-full flex flex-col justify-center cursor-pointer`}
                onClick={() => setHideAdminNavbar(!hideAdminNavbar)}>
                    <div className={`flex flex-col items-center`}>
                        <FaCogs className={`text-[28px] text-gray-400`}/>
                        <div className={`text-[20px] text-gray-400`}>Admin Navbar</div>
                    </div>
                </div>

            </div>
            <div className={'flex mx-auto flex-col pt-5 w-3/4 pb-10 max-[970px]:w-full '}>
                <Routes>
                    <Route path={'home'} element={<AdminHome/>}/>
                    <Route path={'list-goods'} element={<ListGoods/>}/>
                    <Route path={'add-good/:id'} element={<AddGood/>}/>
                    <Route path={'check-orders'} element={<CheckOrders/>}/>
                    <Route path={'create-category'} element={<CreateCategory/>}/>
                    <Route path={'order-details/:id'} element={<AdminOrderDetails/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;