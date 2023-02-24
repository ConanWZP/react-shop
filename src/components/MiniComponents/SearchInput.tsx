import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchInput = () => {
    return (
        <div className={'relative flex-1'}>
            <BsSearch className={'absolute right-2 top-[14px]'} />
            <input className={`w-full rounded-[6px] p-2 border-2 border-gray-300 
                           focus:border-blue-500 outline-none pr-10`}
                type="text"
                placeholder="Search"
            />
            
        </div>
    );
};

export default SearchInput;