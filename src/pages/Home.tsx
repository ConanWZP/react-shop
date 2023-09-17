import React, {useRef} from 'react';
import Slider from "../components/Slider";
import Products from "../components/Products/Products";
const Home = () => {

    const productListRef = useRef<any>(null)

    const scrollToList = () => {
        productListRef.current?.scrollIntoView({behavior: 'smooth', inline: 'start'})
    }


    return (
        <div className={'flex-auto bg-gray-50'}>
            <Slider scrollToList={scrollToList} />
            <Products productListRef={productListRef} />
        </div>
    );
};

export default Home;