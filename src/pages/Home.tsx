import React, {useEffect, useRef} from 'react';
import Slider from "../components/Slider";
import Products from "../components/Products/Products";
import {useNavigate} from "react-router-dom";
import {Timestamp} from "firebase/firestore";

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
          {/*  <div className={`w-full border border-slate-400 h-[1px]`} ref={productListRef}></div>*/}
            <Products productListRef={productListRef} />
        </div>
    );
};

export default Home;