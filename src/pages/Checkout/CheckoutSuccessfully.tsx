import React from 'react';
import {Link} from "react-router-dom";

const CheckoutSuccessfully = () => {
    return (
        <section className={`flex-auto pt-28`}>
            <div className={`max-w-[1280px] mx-auto flex flex-col items-center`}>
                <h2 className={`text-[40px] font-bold max-[500px]:text-[26px]`}>Checkout was succeed</h2>
                <Link to={'/orders-history'} className={`bg-blue-500 px-6 py-1 text-white text-[30px] font-medium
                hover:bg-blue-600 transition-all duration-300 ease-in rounded max-[500px]:text-[18px]`}>
                    Check order status
                </Link>
            </div>

        </section>
    );
};

export default CheckoutSuccessfully;