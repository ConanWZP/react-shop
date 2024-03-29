import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile/Profile";
import AdminPage from "./pages/AdminPage";
import {useAppDispatch, useAppSelector} from "./hooks/customHooks";
import Loader from "./components/MiniComponents/Loader";
import DenyAccess from "./components/Admin/DenyAccess";
import Product from "./components/Products/Product/Product";
import CheckoutDetailsPage from "./pages/Checkout/CheckoutDetailsPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import CheckoutSuccessfully from "./pages/Checkout/CheckoutSuccessfully";
import OrderDetailsPage from "./pages/Orders/OrderDetailsPage";
import {setAuthLoading, setCurrentUser} from "./redux/slices/authSlice";
import {onAuthStateChanged} from "firebase/auth";
import {auth, database} from "./firebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import CreatingReviewPage from "./pages/CreatingReviewPage";
import OrdersHistoryPageContainer from "./pages/Orders/OrdersHistoryPageContainer";
import NotFound from "./pages/NotFound";


interface IUserDocData {
    avatar: string,
    createdAt: unknown,
    email: string,
    name: string,
    uid: string

}
const App = () => {

    const {email, loading} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setAuthLoading(true))
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const getData = async () => {
                    const docRef = doc(database, 'users', user.uid)
                    const docData = await getDoc(docRef)

                    if (docData.exists()) {
                        const {createdAt, email, uid, avatar, name} = docData.data() as IUserDocData
                        dispatch(setCurrentUser({
                            email: email,
                            userName: name,
                            userID: uid,
                            isAuth: true,
                            avatar: avatar
                        }))
                        dispatch(setAuthLoading(false))
                    }

                }
                getData()
            } else {
                console.log('no user')
                console.log(user)
                dispatch(setAuthLoading(false))
            }
        })
    }, [])

    const admins = ['yaroslav2281337@gmail.com', 'admin@shopper.com']



    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/orders-history'} element={<OrdersHistoryPageContainer/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>

                <Route path={'/admin/*'} element={
                    admins.includes(email as string) ?
                        <AdminPage/>
                        : <DenyAccess/>
                }/>

                <Route path={'/product/:id'} element={<Product/>}/>
                <Route path={'/checkout-details'} element={<CheckoutDetailsPage/>}/>
                <Route path={`/checkout-page`} element={<CheckoutPage/>}/>
                <Route path={`/checkout-successfully`} element={<CheckoutSuccessfully />}/>
                <Route path={`/order-details/:id`} element={<OrderDetailsPage />}/>
                <Route path={`/creating-review/:id`} element={<CreatingReviewPage/>}/>
                <Route path={`*`} element={<NotFound/>}/>


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