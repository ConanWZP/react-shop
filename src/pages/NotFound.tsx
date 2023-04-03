import React from 'react';
import {useNavigate} from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <section className={`flex-auto flex justify-center items-center`}>
            <div className={`max-w-[1280px] mx-auto flex flex-col items-center gap-2`}>
                <h2 className={`font-bold text-[44px] text-center`}>404 Not found 😕</h2>

                <button onClick={() => navigate('/')} className={`text-center bg-blue-500 text-[22px] text-white rounded-[10px] px-5 py-1
                hover:bg-blue-600 transition-all duration-300 ease-in-out`}>Back to home page</button>
            </div>
        </section>
    );
};

export default NotFound;