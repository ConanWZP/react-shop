import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import OrdersPage from "./pages/OrdersPage";
import Cart from "./pages/Cart";
import HeaderTest from "./components/headerTest/HeaderTest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";
import AdminPage from "./pages/AdminPage";
import {useAppDispatch, useAppSelector} from "./hooks/customHooks";

import Loader from "./components/MiniComponents/Loader";
import DenyAccess from "./components/Admin/DenyAccess";
import Product from "./components/Products/Product/Product";
import CheckoutDetailsPage from "./pages/Checkout/CheckoutDetailsPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import CheckoutSuccessfully from "./pages/Checkout/CheckoutSuccessfully";


const App = () => {

    const {email, loading} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    /*useEffect(() => {

        dispatch(changeStateOnAuth())
    }, [])

    if (loading) {
        return <Loader />
    }*/


    return (
        <BrowserRouter>
            <Header/>
            {/*<HeaderTest />*/}
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/order'} element={<OrdersPage/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>

                <Route path={'/admin/*'} element={
                    email === 'yaroslav2281337@gmail.com' ?
                        <AdminPage/>
                        : <DenyAccess/>
                }/>

                <Route path={'/product/:id'} element={<Product/>}/>
                <Route path={'/checkout-details'} element={<CheckoutDetailsPage/>}/>
                <Route path={`/checkout-page`} element={<CheckoutPage/>}/>
                <Route path={`/checkout-successfully`} element={<CheckoutSuccessfully />}/>


            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Footer/>
        </BrowserRouter>
    );
};

export default App;