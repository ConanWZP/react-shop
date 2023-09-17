import React from 'react';
import {useLocation} from "react-router-dom";

const Footer = () => {

    const location = useLocation()

    return (
        <div className={`w-full text-white text-center bg-[#406bad] h-16 flex justify-center
         items-center ${location.pathname === '/' ? 'max-[970px]:items-start max-[970px]:h-32 max-[970px]:pt-6' : '' }`}>
                &copy; {new Date().getFullYear()} All Rights Reserved
        </div>
    );
};

export default Footer;