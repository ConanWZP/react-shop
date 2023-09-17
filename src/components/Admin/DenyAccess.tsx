import React from 'react';
import {Link} from "react-router-dom";

const DenyAccess = () => {
    return (
        <div className={'flex-auto mx-auto py-32 text-center'}>
            <h2 className={'text-[32px] font-bold mb-4'}>You don't have access to this page</h2>
            <Link to={'/'}>
                <button className={'bg-blue-500 rounded py-2 px-5 hover:bg-blue-600 text-[20px] text-white'}>&larr; Back to home</button>
            </Link>
        </div>
    );
};

export default DenyAccess;