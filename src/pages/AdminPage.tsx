import React from 'react';
import AdminNavbar from "../components/Admin/AdminNavbar";
import {Route, Routes} from "react-router-dom";
import AdminHome from "../components/Admin/AdminHome";
import ListGoods from "../components/Admin/ListGoods";
import AddGood from "../components/Admin/AddGood";
import CheckOrders from "../components/Admin/CheckOrders";
import CreateCategory from "../components/Admin/CreateCategory";

const AdminPage = () => {
    return (
        <div className={'flex-auto flex'}>
            <div className={'w-1/4'}>
                <AdminNavbar />
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