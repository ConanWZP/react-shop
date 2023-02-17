import React from 'react';

const Footer = () => {
    return (
        <div className={'w-full text-white text-center bg-[#406bad] h-[64px] flex justify-center items-center'}>
                &copy; {new Date().getFullYear()} All Rights Reserved
        </div>
    );
};

export default Footer;