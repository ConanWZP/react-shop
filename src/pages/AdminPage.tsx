import React, {useState} from 'react';
import AdminNavbar from "../components/Admin/AdminNavbar";
import {Route, Routes} from "react-router-dom";
import AdminHome from "../components/Admin/AdminHome";
import ListGoods from "../components/Admin/ListGoods";
import AddGood from "../components/Admin/AddGood";
import CheckOrders from "../components/Admin/CheckOrders";
import CreateCategory from "../components/Admin/CreateCategory";
import {FaCogs} from "react-icons/fa";

const AdminPage = () => {

    const [hideAdminNavbar, setHideAdminNavbar] = useState(true)

    return (
        <div className={'flex-auto min-[600px]:flex relative mt-20'}>
            <div className={hideAdminNavbar ?
                `w-1/4 transition-all duration-300 ease-in-out max-[970px]:w-1/3 max-[970px]:bg-white
                        max-[970px]:absolute max-[970px]:left-[-200%] max-[768px]:h-full max-[970px]:z-10 pl-2`
                :
                `w-1/4 transition-all duration-300 ease-in-out max-[970px]:w-1/3 max-[970px]:bg-white 
                        max-[970px]:absolute max-[970px]:h-full max-[970px]:z-10 left-0 pl-2`}>
                <AdminNavbar />
            </div>
            <div onClick={() => setHideAdminNavbar(!hideAdminNavbar)}
                 className={`hidden justify-center items-center absolute right-0 top-0 
                        cursor-pointer max-[970px]:flex`}>
                <FaCogs size={`20`} className={`text-green-500`}/>
                <span>{hideAdminNavbar ? `Show Admin Navbar` : `Hide Admin Navbar`}</span>
            </div>
            <div className={'flex mx-auto flex-col pt-5'}>
                <Routes>
                    <Route path={'home'} element={<AdminHome/>}/>
                    <Route path={'list-goods'} element={<ListGoods/>}/>
                    <Route path={'add-good/:id'} element={<AddGood/>}/>
                    <Route path={'check-order'} element={<CheckOrders/>}/>
                    <Route path={'create-category'} element={<CreateCategory/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;