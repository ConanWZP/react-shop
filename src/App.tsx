import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/home'} element={<Home/>} />
                <Route path={'/contact'} element={<ContactPage/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;