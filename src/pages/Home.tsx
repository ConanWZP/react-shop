import React, {useEffect, useRef} from 'react';
import Slider from "../components/Slider";
import Products from "../components/Products/Products";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const productListRef = useRef<any>(null)
    const navigate = useNavigate()

    const scrollToList = () => {
        productListRef.current?.scrollIntoView({behavior: 'smooth'})
    }

/*
    const scrollToProductList = () => {
        const url = window.location.href

        if (url.includes('#product-list')) {
            scrollToList()
        }
    }

    useEffect(() => {
        scrollToProductList()
    }, [])*/

    return (
        <div className={'flex-auto bg-gray-50'}>
            <Slider scrollToList={scrollToList} />
            <Products productListRef={productListRef} />
        </div>
    );
};

export default Home;