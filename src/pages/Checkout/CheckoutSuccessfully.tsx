import React from 'react';
import {Link} from "react-router-dom";

const CheckoutSuccessfully = () => {
    return (
        <section className={`flex-auto pt-28`}>
            <div className={`max-w-[1280px] mx-auto`}>
                <h2 className={`text-xl font-bold`}>Checkout was succeed</h2>
                <Link to={'/orders-history'} className={`bg-blue-500 px-6 py-1 text-white text-[22px] font-medium
                hover:bg-blue-600 transition-all duration-300 ease-in`}>
                    Check order status
                </Link>
            </div>

        </section>
    );
};

export default CheckoutSuccessfully;